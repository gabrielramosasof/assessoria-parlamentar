import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/**
 * FAQ Page Object
 * Represents the FAQ page and its elements
 */
export class FaqPage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly pageTitle: Locator;
  readonly faqItems: Locator;
  readonly faqButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.pageTitle = page.locator('h1:has-text("FAQ")');
    this.faqItems = page.locator('[class*="faq"]');
    this.faqButtons = page.locator('button[aria-expanded]');
  }

  /**
   * Navigate to FAQ page
   */
  async goto() {
    await super.goto('/faq');
    await this.waitForPageLoad();
  }

  /**
   * Verify page loaded correctly
   */
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.faqButtons.first().waitFor({ state: 'visible' });
  }

  /**
   * Get FAQ item by index
   */
  getFaqButton(index: number): Locator {
    return this.faqButtons.nth(index);
  }

  /**
   * Click FAQ item to expand/collapse
   */
  async toggleFaqItem(index: number) {
    await this.getFaqButton(index).click();
  }

  /**
   * Check if FAQ item is expanded
   */
  async isFaqItemExpanded(index: number): Promise<boolean> {
    const button = this.getFaqButton(index);
    const expanded = await button.getAttribute('aria-expanded');
    return expanded === 'true';
  }

  /**
   * Get number of FAQ items
   */
  async getFaqCount(): Promise<number> {
    return await this.faqButtons.count();
  }

  /**
   * Expand all FAQ items
   */
  async expandAllFaqItems() {
    const count = await this.getFaqCount();
    for (let i = 0; i < count; i++) {
      const isExpanded = await this.isFaqItemExpanded(i);
      if (!isExpanded) {
        await this.toggleFaqItem(i);
        await this.page.waitForTimeout(300); // Wait for animation
      }
    }
  }

  /**
   * Collapse all FAQ items
   */
  async collapseAllFaqItems() {
    const count = await this.getFaqCount();
    for (let i = 0; i < count; i++) {
      const isExpanded = await this.isFaqItemExpanded(i);
      if (isExpanded) {
        await this.toggleFaqItem(i);
        await this.page.waitForTimeout(300); // Wait for animation
      }
    }
  }
}
