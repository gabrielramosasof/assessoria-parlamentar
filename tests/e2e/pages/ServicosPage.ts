import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/**
 * Serviços Page Object
 * Represents the services page and its elements
 */
export class ServicosPage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly pageTitle: Locator;
  readonly serviceCards: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.pageTitle = page.locator('h1:has-text("Serviços")');
    this.serviceCards = page.locator('[class*="service"], [class*="card"]');
  }

  /**
   * Navigate to services page
   */
  async goto() {
    await super.goto('/servicos');
    await this.waitForPageLoad();
  }

  /**
   * Verify page loaded correctly
   */
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  /**
   * Get number of service cards
   */
  async getServiceCount(): Promise<number> {
    return await this.serviceCards.count();
  }

  /**
   * Verify services are displayed
   */
  async verifyServicesDisplayed(): Promise<boolean> {
    const count = await this.getServiceCount();
    return count > 0;
  }
}
