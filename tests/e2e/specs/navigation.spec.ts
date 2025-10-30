import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

test.describe('Navigation Tests', () => {
  test('should navigate between all pages', async ({ homePage, page }) => {
    await homePage.goto();

    // Test navigation to each page
    await homePage.navigation.navigateToServicos();
    await expect(page).toHaveURL(/.*servicos/);
    await expect(page.locator(`text=${testData.pageTitles.servicos}`)).toBeVisible();

    await homePage.navigation.navigateToEquipe();
    await expect(page).toHaveURL(/.*equipe/);
    await expect(page.locator(`text=${testData.pageTitles.equipe}`)).toBeVisible();

    await homePage.navigation.navigateToFaq();
    await expect(page).toHaveURL(/.*faq/);
    await expect(page.locator(`text=${testData.pageTitles.faq}`)).toBeVisible();

    await homePage.navigation.navigateToContato();
    await expect(page).toHaveURL(/.*contato/);
    await expect(page.locator(`text=${testData.pageTitles.contato}`)).toBeVisible();

    await homePage.navigation.navigateToHome();
    await expect(page).toHaveURL(/.*#\/$/);
  });

  test('should maintain navigation state across pages', async ({ homePage }) => {
    await homePage.goto();

    // Navigate through pages and verify nav is always present
    await homePage.navigation.navigateToServicos();
    await homePage.navigation.verifyAllLinksPresent();

    await homePage.navigation.navigateToEquipe();
    await homePage.navigation.verifyAllLinksPresent();

    await homePage.navigation.navigateToFaq();
    await homePage.navigation.verifyAllLinksPresent();
  });

  test('should handle back button navigation', async ({ homePage, page }) => {
    await homePage.goto();

    await homePage.navigation.navigateToServicos();
    await expect(page).toHaveURL(/.*servicos/);

    await page.goBack();
    await expect(page).toHaveURL(/.*#\/$/);
  });

  test('should handle direct URL access', async ({ page }) => {
    // Directly access each page
    const pages = [
      { path: testData.paths.servicos, title: testData.pageTitles.servicos },
      { path: testData.paths.equipe, title: testData.pageTitles.equipe },
      { path: testData.paths.faq, title: testData.pageTitles.faq },
      { path: testData.paths.contato, title: testData.pageTitles.contato },
    ];

    for (const pageData of pages) {
      await page.goto(pageData.path);
      await expect(page.locator(`text=${pageData.title}`)).toBeVisible();
    }
  });
});

test.describe('Mobile Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(testData.viewports.mobile);
  });

  test('should show mobile menu on all pages', async ({ homePage, page }) => {
    const pages = [
      testData.paths.home,
      testData.paths.servicos,
      testData.paths.equipe,
      testData.paths.faq,
      testData.paths.contato,
    ];

    for (const path of pages) {
      await page.goto(path);
      const isMobileMenuVisible = await homePage.navigation.isMobileMenuVisible();
      expect(isMobileMenuVisible).toBeTruthy();
    }
  });

  test('should navigate via mobile menu', async ({ homePage, page }) => {
    await homePage.goto();

    // Open mobile menu
    await homePage.navigation.openMobileMenu();
    await page.waitForTimeout(500);

    // Click on Serviços in mobile menu
    await homePage.navigation.servicosLink.nth(1).click();
    await expect(page).toHaveURL(/.*servicos/);
  });
});
