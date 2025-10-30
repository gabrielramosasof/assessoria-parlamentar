import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

test.describe('Equipe Page Tests', () => {
  test.beforeEach(async ({ equipePage }) => {
    await equipePage.goto();
  });

  test('should load Equipe page successfully', async ({ equipePage }) => {
    await equipePage.verifyPageLoaded();
  });

  test('should display page title', async ({ equipePage }) => {
    await expect(equipePage.pageTitle).toBeVisible();
  });

  test('should display team information', async ({ equipePage }) => {
    const teamDisplayed = await equipePage.verifyTeamMembersDisplayed();
    expect(teamDisplayed).toBeTruthy();
  });

  test('should navigate to Equipe from home', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.navigation.navigateToEquipe();
    await expect(page).toHaveURL(/.*equipe/);
    await expect(page.locator(`text=${testData.pageTitles.equipe}`)).toBeVisible();
  });
});

test.describe('Equipe Page Responsive Tests', () => {
  test('should be responsive on different devices', async ({ page, equipePage }) => {
    const viewports = [
      testData.viewports.mobile,
      testData.viewports.tablet,
      testData.viewports.desktop,
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await equipePage.goto();
      await equipePage.verifyPageLoaded();
    }
  });
});
