import { test, expect } from '@playwright/test';

const baseUrl = 'https://yumis56.github.io/is373-project';
//const thisPostUrl = new RegExp(`${baseUrl}/\\d{4}/\\d{2}/\\d{2}/about-12factorapp/`); // Since date changes based on re-deployment, make it a pattern. TODO change if static date is set.

test.describe('About the Twelve Factor App Post', () => {
  
  test('Verify correct link and post text', async ({ page }) => {
    await page.goto(baseUrl); // Go to main web page


    await page.waitForSelector('.widget-wrap');
    const postLink = page.locator('.widget-wrap:has(.widget-title:has-text("Recent Posts")) a[href*="about-12factorapp"]');
    console.log(await postLink.count()); //debug
    
    await expect(postLink).toBeVisible();
    await expect(postLink).toHaveText('About the Twelve Factor App');
    
    await postLink.click();
    
    await expect(page).toHaveURL(/.*about-12factorapp/);
    const title = await page.title(); // get page title
    await expect(title).toContain('About the Twelve Factor App'); // just make sure post title is contained properly


  });
  
});
