// Member 3: AI & GitHub Integration Lead
// File: server/services/githubService.js

/**
 * Fetches real repository metadata, languages, and recent commits from GitHub REST API
 */
export async function fetchGitHubRepoDetails(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub repository URL format. Use: https://github.com/:owner/:repo');
  }

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');

  const headers = {
    'User-Agent': 'NexusIQ-Alumni-Engine/1.0',
    'Accept': 'application/vnd.github.v3+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  let repoData = null;
  let languagesData = {};
  let commitsData = [];
  let isSimulated = false;

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (repoRes.ok) {
      repoData = await repoRes.json();
    } else {
      isSimulated = true;
    }

    if (!isSimulated) {
      const [langRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
        fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`, { headers })
      ]);

      if (langRes.ok) languagesData = await langRes.json();
      if (commitsRes.ok) commitsData = await commitsRes.json();
    }
  } catch (err) {
    isSimulated = true;
  }

  return {
    owner,
    repo,
    repoData,
    languagesData,
    commitsData,
    isSimulated
  };
}
