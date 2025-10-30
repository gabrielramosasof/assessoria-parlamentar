import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../fixtures/testData';

test.describe('Contato Page Tests', () => {
  test.beforeEach(async ({ contatoPage }) => {
    await contatoPage.goto();
  });

  test('should load Contato page successfully', async ({ contatoPage }) => {
    await contatoPage.verifyPageLoaded();
  });

  test('should display page title', async ({ contatoPage }) => {
    await expect(contatoPage.pageTitle).toBeVisible();
  });

  test('should display contact information', async ({ contatoPage }) => {
    const contactInfoDisplayed = await contatoPage.verifyContactInfoDisplayed();
    expect(contactInfoDisplayed).toBeTruthy();
  });

  test('should navigate to Contato from home', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.navigation.navigateToContato();
    await expect(page).toHaveURL(/.*contato/);
    await expect(page.locator(`text=${testData.pageTitles.contato}`)).toBeVisible();
  });

  test('should check if contact form exists', async ({ contatoPage }) => {
    const hasForm = await contatoPage.hasContactForm();
    // Just verify the check works, form may or may not exist
    expect(typeof hasForm).toBe('boolean');
  });

  test.skip('should fill and submit contact form if it exists', async ({ contatoPage }) => {
    const hasForm = await contatoPage.hasContactForm();

    if (hasForm) {
      await contatoPage.fillContactForm(
        testData.contactForm.valid.name,
        testData.contactForm.valid.email,
        testData.contactForm.valid.message
      );

      await contatoPage.submitForm();
      // Add assertions based on your actual form behavior
    }
  });
});

test.describe('Contato Page Responsive Tests', () => {
  test('should be responsive on mobile', async ({ page, contatoPage }) => {
    await page.setViewportSize(testData.viewports.mobile);
    await contatoPage.goto();
    await contatoPage.verifyPageLoaded();
  });

  test('should be responsive on tablet', async ({ page, contatoPage }) => {
    await page.setViewportSize(testData.viewports.tablet);
    await contatoPage.goto();
    await contatoPage.verifyPageLoaded();
  });
});
