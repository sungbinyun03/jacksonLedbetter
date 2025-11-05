import { Octokit } from '@octokit/rest';

// Initialize Octokit with token
export function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }
  
  return new Octokit({ auth: token });
}

// Get repository info from environment
export function getRepoInfo() {
  const owner = process.env.GITHUB_OWNER || 'sungbinyun03';
  const repo = process.env.GITHUB_REPO || 'jacksonLedbetter';
  const baseBranch = process.env.GITHUB_BASE_BRANCH || 'main';
  
  return { owner, repo, baseBranch };
}

/**
 * Get the SHA of the latest commit on the base branch
 */
export async function getBaseBranchSha(octokit, owner, repo, baseBranch) {
  const { data } = await octokit.rest.repos.getBranch({
    owner,
    repo,
    branch: baseBranch
  });
  
  return data.commit.sha;
}

/**
 * Create a new branch from the base branch
 */
export async function createBranch(octokit, owner, repo, baseBranch, newBranchName) {
  // Get base branch SHA first
  const baseSha = await getBaseBranchSha(octokit, owner, repo, baseBranch);
  
  // Create new branch
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${newBranchName}`,
    sha: baseSha
  });
  
  return baseSha;
}

/**
 * Create or update a file in the repository
 */
export async function createOrUpdateFile(
  octokit,
  owner,
  repo,
  branch,
  path,
  content,
  message
) {
  try {
    // Try to get the file first to see if it exists
    const { data: existingFile } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });
    
    // File exists, update it
    if (Array.isArray(existingFile) || !existingFile.sha) {
      throw new Error('Unexpected response from getContent');
    }
    
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: content,
      sha: existingFile.sha,
      branch
    });
  } catch (error) {
    if (error.status === 404) {
      // File doesn't exist, create it
      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: content,
        branch
      });
    } else {
      throw error;
    }
  }
}

/**
 * Create a pull request
 */
export async function createPullRequest(
  octokit,
  owner,
  repo,
  head,
  base,
  title,
  body
) {
  const { data } = await octokit.rest.pulls.create({
    owner,
    repo,
    head,
    base,
    title,
    body
  });
  
  return {
    url: data.html_url,
    number: data.number
  };
}

/**
 * Auto-merge a pull request
 */
export async function autoMergePullRequest(octokit, owner, repo, pullNumber) {
  await octokit.rest.pulls.merge({
    owner,
    repo,
    pull_number: pullNumber,
    merge_method: 'squash'
  });
}

/**
 * Main workflow: create PR with config and images
 */
export async function createContentUpdatePR(config, images) {
  const octokit = getOctokit();
  const { owner, repo, baseBranch } = getRepoInfo();
  
  const timestamp = Date.now();
  const branchName = `content/update-${timestamp}`;
  
  // Create branch
  await createBranch(octokit, owner, repo, baseBranch, branchName);
  
  // Update config file
  const configContent = Buffer.from(JSON.stringify(config, null, 2)).toString('base64');
  await createOrUpdateFile(
    octokit,
    owner,
    repo,
    branchName,
    'public/content/config.json',
    configContent,
    `Update site content config`
  );
  
  // Update images if any
  for (const image of images) {
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
  
  // Create PR
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

