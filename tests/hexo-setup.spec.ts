import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

test('Set up Hexo and deploy to GitHub Pages', async ({ page }) => {
  const projectDir = 'blog';
  const githubUsername = 'yumis56';
  const repoName = 'is373-project';

  // Step 1-2: Install Hexo CLI (this assumes Node.js and npm are already installed)
  await execAsync('npm install -g hexo-cli');

  // Step 3-4: Create and initialize Hexo project
  await execAsync(`mkdir ${projectDir} && cd ${projectDir} && hexo init && npm install`);

  // Step 5: Configure Hexo site
  const configPath = path.join(projectDir, '_config.yml');
  let config = await fs.readFile(configPath, 'utf8');
  config = config.replace(/url:.+/, `url: https://${githubUsername}.github.io/${repoName}`);
  await fs.writeFile(configPath, config);

  // Step 6: Install git deployment plugin
  await execAsync(`cd ${projectDir} && npm install hexo-deployer-git --save`);

  // Step 7: Configure deployment
  config += `\ndeploy:\n  type: git\n  repo: https://github.com/${githubUsername}/${repoName}.git\n  branch: gh-pages\n`;
  await fs.writeFile(configPath, config);

  // Step 8: Create a new post
  await execAsync(`cd ${projectDir} && hexo new "My First Post"`);

  // Step 9-10: Generate static files and deploy (this step would actually push to GitHub)
  // Note: We're not actually deploying in this test to avoid modifying real repositories
  await execAsync(`cd ${projectDir} && hexo generate`);
  
  // Verify that the generated files exist
  const publicDir = path.join(projectDir, 'public');
  expect(await fs.stat(publicDir)).toBeTruthy();
  expect(await fs.stat(path.join(publicDir, 'index.html'))).toBeTruthy();

  // Step 11: Set up GitHub Pages (this would typically be done manually in the GitHub UI)
  // For testing, we can verify that the gh-pages branch would be created by the deploy command
  const deployConfig = await fs.readFile(configPath, 'utf8');
  expect(deployConfig).toContain('branch: gh-pages');

  console.log('Hexo site setup and ready for deployment!');
});
