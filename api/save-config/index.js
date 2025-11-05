import { app } from "@azure/functions";
import { createContentUpdatePR, autoMergePullRequest, getOctokit, getRepoInfo } from "../lib/github.js";

app.http('saveConfig', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };
        }

        // Set CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };

        try {
            // Get request body
            const body = await request.json();
            const { config, images } = body;

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

            // Create PR with GitHub API
            const pr = await createContentUpdatePR(config, images || []);

            context.log(`Successfully created PR: ${pr.url}`);

            // Auto-merge if enabled
            let merged = false;
            const autoMergeEnabled = process.env.AUTO_MERGE_ENABLED === 'true';
            
            if (autoMergeEnabled) {
                try {
                    const octokit = getOctokit();
                    const { owner, repo } = getRepoInfo();
                    await autoMergePullRequest(octokit, owner, repo, pr.number);
                    merged = true;
                    context.log(`Successfully auto-merged PR #${pr.number}`);
                } catch (error) {
                    context.error('Failed to auto-merge PR:', error);
                    // Don't fail the request if merge fails - PR was created successfully
                }
            }

            return {
                status: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    prUrl: pr.url,
                    merged: merged
                })
            };
        } catch (error) {
            context.error('Error in save-config:', error);

            return {
                status: 500,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: error.message || 'Internal server error'
                })
            };
        }
    }
});

