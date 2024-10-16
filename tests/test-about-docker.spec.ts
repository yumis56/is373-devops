import { test, expect } = require('@playwright/test');

const baseUrl = 'https://yumis56.github.io/is373-project';
const thisPostUrl = new RegExp(`${baseUrl}/\\d{4}/\\d{2}/\\d{2}/about-docker/`); // Since date changes based on re-deployment, make it a pattern. TODO change if static date is set.

test.describe('About Docker Post', () => {
  test('Verify correct link title', async ({ page }) => {
    await page.goto(baseUrl); // Go to main web page
    const menuLink = await page.locator('a:has-text("About Docker")'); // Verify link labeled 'About Docker'
    await expect(menuLink).toBeVisible(); // Verify link is not hidden

    await menuLink.click(); // click link

    const currentUrl = page.url(); // Gets current browser URL
    await expect(currentUrl).toMatch(thisPostUrl); // Verify that browser URL follows correct format

    const title = await page.title(); // get page title
    await expect(title).toContain('About Docker'); // Full title is "About Docker | Hexo", just make sure post title is contained properly

    const mainHeading = await page.locator('h1.p-name.article-title'); // locate the article title element
    await expect(mainHeading).toHaveText('About Docker'); // Verify the visible header title is correct
  });
});
