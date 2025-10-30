import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

test.describe('Serviços Page Tests', () => {
  test.beforeEach(async ({ servicosPage }) => {
    await servicosPage.goto();
  });

  test('should load Serviços page successfully', async ({ servicosPage }) => {
    await servicosPage.verifyPageLoaded();
  });

  test('should display page title', async ({ servicosPage }) => {
    await expect(servicosPage.pageTitle).toBeVisible();
  });

  test('should display services information', async ({ servicosPage }) => {
    const servicesDisplayed = await servicosPage.verifyServicesDisplayed();
    expect(servicesDisplayed).toBeTruthy();
  });

  test('should navigate to Serviços from home', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.navigation.navigateToServicos();
    await expect(page).toHaveURL(/.*servicos/);
    await expect(page.locator(`text=${testData.pageTitles.servicos}`)).toBeVisible();
  });

  test('should maintain scroll position', async ({ servicosPage, page }) => {
    await servicosPage.verifyPageLoaded();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Serviços Page Responsive Tests', () => {
  test('should be responsive on tablet', async ({ page, servicosPage }) => {
    await page.setViewportSize(testData.viewports.tablet);
    await servicosPage.goto();
    await servicosPage.verifyPageLoaded();
  });

  test('should be responsive on mobile', async ({ page, servicosPage }) => {
    await page.setViewportSize(testData.viewports.mobile);
    await servicosPage.goto();
    await servicosPage.verifyPageLoaded();
  });
});
