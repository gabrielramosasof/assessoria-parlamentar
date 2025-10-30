import { Page, Locator } from '@playwright/test';

/**
 * Navigation Component
 * Handles navigation bar interactions across all pages
 */
export class NavigationComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly servicosLink: Locator;
  readonly equipeLink: Locator;
  readonly faqLink: Locator;
  readonly contatoLink: Locator;
  readonly mobileMenuButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('nav a[href="#/"]').first();
    this.homeLink = page.locator('a:has-text("Home")');
    this.servicosLink = page.locator('a:has-text("Serviços")');
    this.equipeLink = page.locator('a:has-text("Equipe")');
    this.faqLink = page.locator('a:has-text("FAQ")');
    this.contatoLink = page.locator('a:has-text("Contato")');
    this.mobileMenuButton = page.locator('button[aria-label="Abrir menu"]');
  }

  /**
   * Navigate to Home page
   */
  async navigateToHome() {
    await this.homeLink.first().click();
    await this.page.waitForURL(/.*#\/$/, { timeout: 5000 });
  }

  /**
   * Navigate to Serviços page
   */
  async navigateToServicos() {
    await this.servicosLink.first().click();
    await this.page.waitForURL(/.*#\/servicos/, { timeout: 5000 });
  }

  /**
   * Navigate to Equipe page
   */
  async navigateToEquipe() {
    await this.equipeLink.first().click();
    await this.page.waitForURL(/.*#\/equipe/, { timeout: 5000 });
  }

  /**
   * Navigate to FAQ page
   */
  async navigateToFaq() {
    await this.faqLink.first().click();
    await this.page.waitForURL(/.*#\/faq/, { timeout: 5000 });
  }

  /**
   * Navigate to Contato page
   */
  async navigateToContato() {
    await this.contatoLink.first().click();
    await this.page.waitForURL(/.*#\/contato/, { timeout: 5000 });
  }

  /**
   * Open mobile menu
   */
  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }

  /**
   * Check if mobile menu is visible
   */
  async isMobileMenuVisible(): Promise<boolean> {
    return await this.mobileMenuButton.isVisible();
  }

  /**
   * Verify all navigation links are present
   */
  async verifyAllLinksPresent() {
    const links = [this.homeLink, this.servicosLink, this.equipeLink, this.faqLink, this.contatoLink];
    for (const link of links) {
      await link.first().waitFor({ state: 'visible' });
    }
  }
}
