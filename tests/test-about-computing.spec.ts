import { test, expect } from '@playwright/test';

const baseUrl = 'https://yumis56.github.io/is373-project';

test('check page title', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveTitle('Hexo'); // Check if the title matches
});

test('check main navigation links', async ({ page }) => {
  await page.goto(baseUrl);
  
  // Check if the main navigation links are visible
  await expect(page.locator('a.main-nav-link[href="/is373-project/"]')).toBeVisible();
  await expect(page.locator('a.main-nav-link[href="/is373-project/archives"]')).toBeVisible();
});

test('check for the Hello World post', async ({ page }) => {
  await page.goto(baseUrl);
  
  // Check if the "Hello World" post link is visible
  await expect(page.locator('a[href="/is373-project/2024/10/04/hello-world/"]')).toBeVisible();
});

test('check recent posts section', async ({ page }) => {
  await page.goto(baseUrl);
  
  // Check if the recent posts section displays the "Hello World" post
  const recentPost = page.locator('ul.widget > li > a');
  await expect(recentPost).toHaveText('Hello World');
});

test('check footer information', async ({ page }) => {
  await page.goto(baseUrl);
  
  // Check if footer has the correct copyright information
  await expect(page.locator('#footer-info')).toContainText('&copy; 2024 John Doe');
});

test('check if search form is functional', async ({ page }) => {
  await page.goto(baseUrl);
  
  // Fill the search form
  await page.fill('input[name="q"]', 'Hexo');
  await page.click('button[type="submit"]');

  // Assuming the search redirects to Google, check the URL
  await expect(page).toHaveURL(/google\.com/);
});
