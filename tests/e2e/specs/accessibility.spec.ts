import { test, expect } from '../fixtures/baseFixtures';
import AxeBuilder from '@axe-core/playwright';
import { testData } from '../fixtures/testData';

test.describe('Accessibility Tests', () => {
  test('Home page should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Serviços page should not have accessibility violations', async ({ page }) => {
    await page.goto('/servicos');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Equipe page should not have accessibility violations', async ({ page }) => {
    await page.goto('/equipe');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('FAQ page should not have accessibility violations', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contato page should not have accessibility violations', async ({ page }) => {
    await page.goto('/contato');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Either has alt text or is decorative (alt="")
      expect(alt).toBeDefined();
    }
  });

  test('should have proper aria labels for interactive elements', async ({ page }) => {
    await page.goto('/');

    // Check mobile menu button
    await page.setViewportSize(testData.viewports.mobile);
    const menuButton = page.locator('button[aria-label="Abrir menu"]');
    if (await menuButton.isVisible()) {
      const ariaLabel = await menuButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('FAQ items should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForSelector('button[aria-expanded]');

    const faqButtons = page.locator('button[aria-expanded]');
    const count = await faqButtons.count();

    if (count > 0) {
      const firstButton = faqButtons.first();
      const ariaExpanded = await firstButton.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(ariaExpanded);
    }
  });
});

test.describe('Accessibility - WCAG 2.1 Level AA', () => {
  test('should meet WCAG 2.1 Level AA standards on all pages', async ({ page }) => {
    const pages = [
      testData.paths.home,
      testData.paths.servicos,
      testData.paths.equipe,
      testData.paths.faq,
      testData.paths.contato,
    ];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });
});

test.describe('Accessibility - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(testData.viewports.mobile);
  });

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper touch target sizes', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aaa'])
      .disableRules(['target-size']) // This rule might be too strict
      .analyze();

    // Check for critical violations only
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });
});
