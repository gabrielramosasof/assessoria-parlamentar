import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load home page successfully', async ({ homePage }) => {
    await homePage.verifyPageLoaded();
    await expect(homePage.mainTitle).toBeVisible();
  });

  test('should display navigation menu', async ({ homePage }) => {
    await homePage.navigation.verifyAllLinksPresent();
  });

  test('should display CTA button', async ({ homePage }) => {
    await expect(homePage.ctaButton).toBeVisible();
  });

  test('should navigate to services page via CTA', async ({ homePage, page }) => {
    await homePage.clickCtaButton();
    await expect(page).toHaveURL(/.*servicos/);
  });

  test('should display hero section', async ({ homePage }) => {
    const isVisible = await homePage.verifyHeroSection();
    expect(isVisible).toBeTruthy();
  });

  test('should have correct page title', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
  });

  test('should navigate through all pages from home', async ({ homePage, page }) => {
    // Navigate to Serviços
    await homePage.navigation.navigateToServicos();
    await expect(page).toHaveURL(/.*servicos/);

    // Navigate to Equipe
    await homePage.navigation.navigateToEquipe();
    await expect(page).toHaveURL(/.*equipe/);

    // Navigate to FAQ
    await homePage.navigation.navigateToFaq();
    await expect(page).toHaveURL(/.*faq/);

    // Navigate to Contato
    await homePage.navigation.navigateToContato();
    await expect(page).toHaveURL(/.*contato/);

    // Navigate back to Home
    await homePage.navigation.navigateToHome();
    await expect(page).toHaveURL(/.*#\/$/);
  });
});

test.describe('Home Page Mobile Tests', () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.setViewportSize(testData.viewports.mobile);
    await homePage.goto();
  });

  test('should display mobile menu button', async ({ homePage }) => {
    const isMobileMenuVisible = await homePage.navigation.isMobileMenuVisible();
    expect(isMobileMenuVisible).toBeTruthy();
  });

  test('should open mobile menu', async ({ homePage, page }) => {
    await homePage.navigation.openMobileMenu();
    // Wait for menu animation
    await page.waitForTimeout(500);
    // Verify menu items are now visible
    await expect(homePage.navigation.homeLink.nth(1)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ homePage }) => {
    await homePage.verifyPageLoaded();
    const isVisible = await homePage.verifyHeroSection();
    expect(isVisible).toBeTruthy();
  });
});
