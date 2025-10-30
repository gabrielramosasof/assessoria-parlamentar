import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

/**
 * Visual Regression Tests
 * These tests capture screenshots and compare them against baseline images
 * Run with: npm run e2e:ui to update snapshots
 */

test.describe('Visual Regression Tests - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(testData.viewports.desktop);
  });

  test('Home page visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Serviços page visual snapshot', async ({ page }) => {
    await page.goto('/servicos');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('servicos-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Equipe page visual snapshot', async ({ page }) => {
    await page.goto('/equipe');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('equipe-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('FAQ page visual snapshot', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('faq-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Contato page visual snapshot', async ({ page }) => {
    await page.goto('/contato');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('contato-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression Tests - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(testData.viewports.mobile);
  });

  test('Home page mobile visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Serviços page mobile visual snapshot', async ({ page }) => {
    await page.goto('/servicos');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('servicos-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Mobile menu visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="Abrir menu"]');
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for menu animation

    await expect(page).toHaveScreenshot('mobile-menu-open.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression Tests - Tablet', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(testData.viewports.tablet);
  });

  test('Home page tablet visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression Tests - Interactive States', () => {
  test('FAQ expanded state visual snapshot', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForLoadState('networkidle');

    // Expand first FAQ item
    const firstFaqButton = page.locator('button[aria-expanded]').first();
    await firstFaqButton.click();
    await page.waitForTimeout(300); // Wait for animation

    await expect(page).toHaveScreenshot('faq-expanded-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Navigation hover states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hover over a navigation link
    const servicosLink = page.locator('a:has-text("Serviços")').first();
    await servicosLink.hover();

    await expect(page.locator('nav')).toHaveScreenshot('nav-hover-state.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Visual Regression Tests - Component Snapshots', () => {
  test('Navigation component snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation-component.png', {
      animations: 'disabled',
    });
  });

  test('Footer component snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer-component.png', {
      animations: 'disabled',
    });
  });
});
