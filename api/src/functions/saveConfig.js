const { app } = require('@azure/functions');
const { Octokit } = require('@octokit/rest');

function getOctokit() {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN environment variable is not set');
	}
	return new Octokit({ auth: token });
}

function getRepoInfo() {
	const owner = process.env.GITHUB_OWNER || 'sungbinyun03';
	const repo = process.env.GITHUB_REPO || 'jacksonLedbetter';
	const baseBranch = process.env.GITHUB_BASE_BRANCH || 'main';
	return { owner, repo, baseBranch };
}

async function getBaseBranchSha(octokit, owner, repo, baseBranch) {
	const { data } = await octokit.rest.repos.getBranch({
		owner,
		repo,
		branch: baseBranch
	});
	return data.commit.sha;
}

async function createBranch(octokit, owner, repo, baseBranch, newBranchName) {
	const baseSha = await getBaseBranchSha(octokit, owner, repo, baseBranch);
	await octokit.rest.git.createRef({
		owner,
		repo,
		ref: `refs/heads/${newBranchName}`,
		sha: baseSha
	});
	return baseSha;
}

async function createOrUpdateFile(octokit, owner, repo, branch, path, content, message) {
	try {
		const { data: existingFile } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path,
			ref: branch
		});

		if (Array.isArray(existingFile) || !existingFile.sha) {
			throw new Error('Unexpected response from getContent');
		}

		await octokit.rest.repos.createOrUpdateFileContents({
			owner,
			repo,
			path,
			message,
			content,
			sha: existingFile.sha,
			branch
		});
	} catch (error) {
		if (error.status === 404) {
			await octokit.rest.repos.createOrUpdateFileContents({
				owner,
				repo,
				path,
				message,
				content,
				branch
			});
		} else {
			throw error;
		}
	}
}

async function createPullRequest(octokit, owner, repo, head, base, title, body) {
	const { data } = await octokit.rest.pulls.create({
		owner,
		repo,
		head,
		base,
		title,
		body
	});
	return { url: data.html_url, number: data.number };
}

async function autoMergePullRequest(octokit, owner, repo, pullNumber) {
	await octokit.rest.pulls.merge({
		owner,
		repo,
		pull_number: pullNumber,
		merge_method: 'squash'
	});
}

async function createContentUpdatePR(config, images) {
	const octokit = getOctokit();
	const { owner, repo, baseBranch } = getRepoInfo();

	const timestamp = Date.now();
	const branchName = `content/update-${timestamp}`;

	await createBranch(octokit, owner, repo, baseBranch, branchName);

	const configContent = Buffer.from(JSON.stringify(config, null, 2)).toString('base64');
	await createOrUpdateFile(
		octokit,
		owner,
		repo,
		branchName,
		'public/content/config.json',
		configContent,
		'Update site content config'
	);

	for (const image of images || []) {
		const imageContent = image.base64data;
		await createOrUpdateFile(
			octokit,
			owner,
			repo,
			branchName,
			`public/assets/${image.name}`,
			imageContent,
			`Add image: ${image.name}`
		);
	}

	const pr = await createPullRequest(
		octokit,
		owner,
		repo,
		branchName,
		baseBranch,
		'Content Update',
		`Automatic content update from CMS Admin\n\nGenerated at: ${new Date().toISOString()}`
	);

	return pr;
}

app.http('saveConfig', {
	methods: ['POST', 'OPTIONS'],
	authLevel: 'anonymous',
	route: 'saveConfig',
	handler: async (request, context) => {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json'
		};

		if (request.method === 'OPTIONS') {
			return {
				status: 200,
				headers: corsHeaders
			};
		}

		try {
			const body = await request.json();
			const { config, images } = body || {};

			if (!config) {
				return {
					status: 400,
					headers: corsHeaders,
					body: JSON.stringify({
						success: false,
						message: 'Missing config in request body'
					})
				};
			}

			const pr = await createContentUpdatePR(config, images || []);
			context.log(`Successfully created PR: ${pr.url}`);

			let merged = false;
			const autoMergeEnabled = process.env.AUTO_MERGE_ENABLED === 'true';

			if (autoMergeEnabled) {
				try {
					const octokit = getOctokit();
					const { owner, repo } = getRepoInfo();
					await autoMergePullRequest(octokit, owner, repo, pr.number);
					merged = true;
					context.log(`Successfully auto-merged PR #${pr.number}`);
				} catch (mergeError) {
					context.log.error('Failed to auto-merge PR:', mergeError);
				}
			}

			return {
				status: 200,
				headers: corsHeaders,
				body: JSON.stringify({
					success: true,
					prUrl: pr.url,
					merged
				})
			};
		} catch (error) {
			context.log.error('Error in saveConfig handler:', error);
			return {
				status: 500,
				headers: corsHeaders,
				body: JSON.stringify({
					success: false,
					message: error?.message || 'Internal server error'
				})
			};
		}
	}
});
