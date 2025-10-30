import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/**
 * Home Page Object
 * Represents the home page and its elements
 */
export class HomePage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly mainTitle: Locator;
  readonly ctaButton: Locator;
  readonly heroSection: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.mainTitle = page.locator('text=ASSESSORIA PARLAMENTAR');
    this.ctaButton = page.locator('text=Conheça nossos serviços');
    this.heroSection = page.locator('main');
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Verify page loaded correctly
   */
  async verifyPageLoaded() {
    await this.mainTitle.waitFor({ state: 'visible' });
    await this.navigation.verifyAllLinksPresent();
  }

  /**
   * Click on CTA button
   */
  async clickCtaButton() {
    await this.ctaButton.click();
  }

  /**
   * Verify hero section is visible
   */
  async verifyHeroSection(): Promise<boolean> {
    return await this.isVisible(this.heroSection);
  }
}
