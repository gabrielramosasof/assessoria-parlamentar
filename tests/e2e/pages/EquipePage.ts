import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/**
 * Equipe Page Object
 * Represents the team page and its elements
 */
export class EquipePage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly pageTitle: Locator;
  readonly teamMembers: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.pageTitle = page.locator('h1:has-text("Equipe")');
    this.teamMembers = page.locator('[class*="team"], [class*="member"]');
  }

  /**
   * Navigate to team page
   */
  async goto() {
    await super.goto('/equipe');
    await this.waitForPageLoad();
  }

  /**
   * Verify page loaded correctly
   */
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  /**
   * Get number of team members
   */
  async getTeamMemberCount(): Promise<number> {
    return await this.teamMembers.count();
  }

  /**
   * Verify team members are displayed
   */
  async verifyTeamMembersDisplayed(): Promise<boolean> {
    const count = await this.getTeamMemberCount();
    return count > 0;
  }
}
