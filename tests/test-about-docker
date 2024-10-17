import { test, expect } from '@playwright/test';

const baseUrl = 'https://yumis56.github.io/is373-project';
const thisPostUrl = new RegExp(`${baseUrl}/\\d{4}/\\d{2}/\\d{2}/about-docker/`); // Since date changes based on re-deployment, make it a pattern. TODO change if static date is set.

test.describe('About Docker Post', () => {
  
  test('Verify correct link and post text', async ({ page }) => {
    await page.goto(baseUrl); // Go to main web page

    await expect(page.locator('a[href="/is373-project/\\d{4}/\\d{2}/\\d{2}/about-docker/"]')).toBeVisible();
    await expect(page.locator('a[href="/is373-project/\\d{4}/\\d{2}/\\d{2}/about-docker/"]')).toHaveText('About Docker');

    await page.locator('a[href="/is373-project/\\d{4}/\\d{2}/\\d{2}/about-docker/"]').click();
    await expect(page).toHaveURL(/.*about-docker/);

    const title = await page.title(); // get page title
    await expect(title).toContain('About Docker'); // just make sure post title is contained properly

  });
  
});
