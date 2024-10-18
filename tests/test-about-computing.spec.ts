import { test, expect } from '@playwright/test';

const baseUrl = 'https://yumis56.github.io/is373-project';

test.describe('About Computing Parts and Concepts', () => {
  
    test('Verify correct link and post text', async ({ page }) => {
      await page.goto(baseUrl); // Go to main web page
  
  
      await page.waitForSelector('.widget-wrap');
      const postLink = page.locator('.widget-wrap:has(.widget-title:has-text("Recent Posts")) a[href*="about-computers-etc"]');
      console.log(await postLink.count()); //debug
      
      await expect(postLink).toBeVisible();
      await expect(postLink).toHaveText('About Computing Parts and Concepts');
      
      await postLink.click();
      
<<<<<<< HEAD
      await expect(page).toHaveURL(/.*about-computers-etc/);
=======
      await expect(page).toHaveURL(/.*about-computersetc/);
>>>>>>> 62e43d4af8115cd22cb02bd431922e98cb575483
      const title = await page.title(); // get page title
      await expect(title).toContain('About Computing Parts and Concepts'); // just make sure post title is contained properly
  
  
    });
    
  });