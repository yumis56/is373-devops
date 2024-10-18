import { test, expect } from '@playwright/test';

const baseUrl = 'https://yumis56.github.io/is373-project';

test.describe('Check page title, menu link, and article heading', () => {
  
    test('Verify correct link and post text', async ({ page }) => {
        await page.goto(baseUrl); // Go to main web page

        const postLink = page.locator('a[href*="virtualization-containerization"]');
        console.log(await postLink.count()); //debug
      
        await expect(postLink).toBeVisible();
        await expect(postLink).toHaveText('About Virutalization and Containerization');


        await postLink.click();
    
        await expect(page).toHaveURL(/.*virtualization-containerization/);
        const title = await page.title(); // get page title
        await expect(title).toContain('About Virtualization and Containerization');

    });
});