import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/**
 * Contato Page Object
 * Represents the contact page and its elements
 */
export class ContatoPage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly pageTitle: Locator;
  readonly contactInfo: Locator;
  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.pageTitle = page.locator('h1:has-text("Contato")');
    this.contactInfo = page.locator('[class*="contact"]');
    this.contactForm = page.locator('form');
    this.nameInput = page.locator('input[name="name"], input[id="name"], input[placeholder*="Nome"]');
    this.emailInput = page.locator('input[name="email"], input[id="email"], input[type="email"]');
    this.messageInput = page.locator('textarea[name="message"], textarea[id="message"], textarea[placeholder*="Mensagem"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  /**
   * Navigate to contact page
   */
  async goto() {
    await super.goto('/contato');
    await this.waitForPageLoad();
  }

  /**
   * Verify page loaded correctly
   */
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  /**
   * Check if contact form exists
   */
  async hasContactForm(): Promise<boolean> {
    return await this.isVisible(this.contactForm);
  }

  /**
   * Fill contact form
   */
  async fillContactForm(name: string, email: string, message: string) {
    if (await this.isVisible(this.nameInput)) {
      await this.nameInput.fill(name);
    }
    if (await this.isVisible(this.emailInput)) {
      await this.emailInput.fill(email);
    }
    if (await this.isVisible(this.messageInput)) {
      await this.messageInput.fill(message);
    }
  }

  /**
   * Submit contact form
   */
  async submitForm() {
    if (await this.isVisible(this.submitButton)) {
      await this.submitButton.click();
    }
  }

  /**
   * Verify contact info is displayed
   */
  async verifyContactInfoDisplayed(): Promise<boolean> {
    return await this.isVisible(this.contactInfo);
  }
}
