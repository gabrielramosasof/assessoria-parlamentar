import { test, expect } from '../fixtures/baseFixtures';

test.describe('FAQ Page Tests', () => {
  test.beforeEach(async ({ faqPage }) => {
    await faqPage.goto();
  });

  test('should load FAQ page successfully', async ({ faqPage }) => {
    await faqPage.verifyPageLoaded();
  });

  test('should display FAQ items', async ({ faqPage }) => {
    const count = await faqPage.getFaqCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should expand FAQ item on click', async ({ faqPage }) => {
    // Initially should be collapsed
    const initiallyExpanded = await faqPage.isFaqItemExpanded(0);
    expect(initiallyExpanded).toBeFalsy();

    // Click to expand
    await faqPage.toggleFaqItem(0);

    // Should now be expanded
    const nowExpanded = await faqPage.isFaqItemExpanded(0);
    expect(nowExpanded).toBeTruthy();
  });

  test('should collapse FAQ item on second click', async ({ faqPage }) => {
    // Expand first
    await faqPage.toggleFaqItem(0);
    expect(await faqPage.isFaqItemExpanded(0)).toBeTruthy();

    // Click again to collapse
    await faqPage.toggleFaqItem(0);
    expect(await faqPage.isFaqItemExpanded(0)).toBeFalsy();
  });

  test('should toggle multiple FAQ items independently', async ({ faqPage }) => {
    const count = await faqPage.getFaqCount();

    if (count >= 2) {
      // Expand first item
      await faqPage.toggleFaqItem(0);
      expect(await faqPage.isFaqItemExpanded(0)).toBeTruthy();

      // Expand second item
      await faqPage.toggleFaqItem(1);
      expect(await faqPage.isFaqItemExpanded(1)).toBeTruthy();

      // Both should be expanded
      expect(await faqPage.isFaqItemExpanded(0)).toBeTruthy();
      expect(await faqPage.isFaqItemExpanded(1)).toBeTruthy();
    }
  });

  test('should expand all FAQ items', async ({ faqPage }) => {
    await faqPage.expandAllFaqItems();

    const count = await faqPage.getFaqCount();
    for (let i = 0; i < count; i++) {
      const isExpanded = await faqPage.isFaqItemExpanded(i);
      expect(isExpanded).toBeTruthy();
    }
  });

  test('should collapse all FAQ items', async ({ faqPage }) => {
    // First expand all
    await faqPage.expandAllFaqItems();

    // Then collapse all
    await faqPage.collapseAllFaqItems();

    const count = await faqPage.getFaqCount();
    for (let i = 0; i < count; i++) {
      const isExpanded = await faqPage.isFaqItemExpanded(i);
      expect(isExpanded).toBeFalsy();
    }
  });

  test('should have proper aria attributes', async ({ faqPage }) => {
    const button = faqPage.getFaqButton(0);
    const ariaExpanded = await button.getAttribute('aria-expanded');
    expect(ariaExpanded).toBeTruthy();
    expect(['true', 'false']).toContain(ariaExpanded);
  });
});

test.describe('FAQ Page Mobile Tests', () => {
  test('should work on mobile devices', async ({ page, faqPage }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await faqPage.goto();

    await faqPage.verifyPageLoaded();

    // Test FAQ interaction on mobile
    await faqPage.toggleFaqItem(0);
    expect(await faqPage.isFaqItemExpanded(0)).toBeTruthy();
  });
});
