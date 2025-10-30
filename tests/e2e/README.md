# E2E Testing Suite Documentation

## Overview

This comprehensive end-to-end testing suite uses Playwright to ensure the quality and reliability of the Assessoria Parlamentar application. The suite includes functional tests, accessibility testing, visual regression testing, and cross-browser compatibility testing.

## Table of Contents

- [Getting Started](#getting-started)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Page Object Model](#page-object-model)
- [Test Types](#test-types)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Test Structure

```
tests/e2e/
├── fixtures/
│   ├── baseFixtures.ts       # Custom fixtures for page objects
│   └── testData.ts            # Test data and constants
├── pages/
│   ├── BasePage.ts            # Base page object with common methods
│   ├── NavigationComponent.ts # Navigation component
│   ├── HomePage.ts            # Home page object
│   ├── ServicosPage.ts        # Services page object
│   ├── EquipePage.ts          # Team page object
│   ├── FaqPage.ts             # FAQ page object
│   └── ContatoPage.ts         # Contact page object
├── specs/
│   ├── home.spec.ts           # Home page tests
│   ├── navigation.spec.ts     # Navigation tests
│   ├── servicos.spec.ts       # Services page tests
│   ├── equipe.spec.ts         # Team page tests
│   ├── faq.spec.ts            # FAQ page tests
│   ├── contato.spec.ts        # Contact page tests
│   ├── accessibility.spec.ts  # Accessibility tests
│   └── visual.spec.ts         # Visual regression tests
└── README.md                  # This file
```

## Running Tests

### All Tests

```bash
# Run all tests
npm run e2e

# Run tests in headed mode (see browser)
npm run e2e:headed

# Run tests in UI mode (interactive)
npm run e2e:ui

# Run tests in debug mode
npm run e2e:debug
```

### Specific Test Files

```bash
# Run specific test file
npx playwright test home.spec.ts

# Run specific test suite
npx playwright test --grep "Home Page Tests"

# Run specific test
npx playwright test --grep "should load home page successfully"
```

### Browser-Specific Tests

```bash
# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run mobile tests
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Test Reports

```bash
# View last test report
npm run e2e:report

# Generate and open HTML report
npx playwright show-report
```

## Page Object Model

The test suite uses the Page Object Model (POM) pattern for better maintainability and reusability.

### Base Page

All page objects extend `BasePage`, which provides common methods:

```typescript
import { BasePage } from './BasePage';

class MyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
```

### Using Page Objects in Tests

```typescript
import { test, expect } from '../fixtures/baseFixtures';

test('example test', async ({ homePage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
});
```

### Creating New Page Objects

1. Create a new file in `tests/e2e/pages/`
2. Extend `BasePage`
3. Define locators and methods
4. Add to fixtures if needed

Example:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
  }

  async goto() {
    await super.goto('/new-page');
    await this.waitForPageLoad();
  }
}
```

## Test Types

### Functional Tests

Test user interactions and business logic:

```typescript
test('should navigate to services page', async ({ homePage, page }) => {
  await homePage.goto();
  await homePage.navigation.navigateToServicos();
  await expect(page).toHaveURL(/.*servicos/);
});
```

### Accessibility Tests

Ensure WCAG 2.1 AA compliance:

```typescript
test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Visual Regression Tests

Capture and compare screenshots:

```typescript
test('home page visual snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('home-page.png');
});
```

### Mobile Tests

Test responsive behavior:

```typescript
test('should work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  // Test mobile-specific behavior
});
```

## CI/CD Integration

### GitHub Actions

Two workflows are configured:

1. **E2E Tests** (`.github/workflows/e2e-tests.yml`)
   - Runs on push/PR to main/develop
   - Tests all browsers and mobile devices
   - Uploads test reports and videos

2. **Visual Regression** (`.github/workflows/visual-regression.yml`)
   - Runs on pull requests
   - Detects visual changes
   - Comments on PR with results

### Environment Variables

Set these in your CI/CD environment:

- `CI=true` - Enables CI-specific configurations
- `BASE_URL` - Override base URL (default: http://localhost:5173)

## Best Practices

### Writing Tests

1. **Use Page Objects**: Always use page objects instead of direct selectors
2. **Wait for Elements**: Use `waitFor()` methods instead of hard waits
3. **Descriptive Names**: Use clear, descriptive test names
4. **Independent Tests**: Each test should be independent and not rely on others
5. **Clean Up**: Clean up test data after tests

### Selectors

1. **Prefer User-Facing Attributes**: Use text content, ARIA labels, roles
2. **Avoid CSS Selectors**: Use semantic selectors when possible
3. **Use Test IDs**: Add `data-testid` attributes for complex elements

Example:

```typescript
// Good
page.locator('button:has-text("Submit")');
page.locator('[aria-label="Close dialog"]');

// Avoid
page.locator('.btn-primary.submit-btn');
```

### Assertions

1. **Use Auto-Waiting Assertions**: Playwright assertions auto-wait
2. **Specific Assertions**: Use the most specific assertion possible
3. **Meaningful Messages**: Add custom messages to assertions

```typescript
// Good
await expect(page.locator('h1')).toBeVisible();
await expect(page).toHaveURL(/.*servicos/);

// With custom message
await expect(element).toBeVisible({ message: 'Header should be visible' });
```

### Test Organization

1. **Group Related Tests**: Use `test.describe()` to group tests
2. **Use Hooks**: Use `beforeEach()` for common setup
3. **Skip When Needed**: Use `test.skip()` for tests that aren't ready

```typescript
test.describe('Feature X', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup
  });

  test('should do something', async ({ page }) => {
    // Test code
  });

  test.skip('not implemented yet', async ({ page }) => {
    // Will be skipped
  });
});
```

## Troubleshooting

### Common Issues

#### Tests Timeout

```bash
# Increase timeout in playwright.config.ts
timeout: 60 * 1000
```

#### Element Not Found

```typescript
// Add explicit wait
await page.waitForSelector('selector', { state: 'visible' });
```

#### Flaky Tests

1. Add proper waits (`waitForLoadState`, `waitForSelector`)
2. Disable animations in visual tests
3. Use `test.retry()` for flaky tests

#### Visual Test Failures

```bash
# Update snapshots
npx playwright test --update-snapshots

# Update specific test
npx playwright test visual.spec.ts --update-snapshots
```

### Debug Mode

```bash
# Run in debug mode
npm run e2e:debug

# Debug specific test
npx playwright test home.spec.ts --debug

# Use headed mode
npm run e2e:headed
```

### Viewing Test Results

```bash
# View HTML report
npm run e2e:report

# View trace viewer (for failed tests)
npx playwright show-trace trace.zip
```

## Advanced Features

### Parallel Testing

Tests run in parallel by default. Configure in `playwright.config.ts`:

```typescript
workers: process.env.CI ? 1 : undefined
```

### Test Retries

Configure automatic retries:

```typescript
retries: process.env.CI ? 2 : 0
```

### Video Recording

Videos are recorded on failure:

```typescript
video: 'retain-on-failure'
```

### Tracing

Traces are collected on retry:

```typescript
trace: 'on-first-retry'
```

## Contributing

When adding new tests:

1. Follow the Page Object Model pattern
2. Add tests to appropriate spec files
3. Update fixtures if adding new pages
4. Update this documentation
5. Ensure tests pass in all browsers
6. Run accessibility tests on new pages

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For issues or questions:
1. Check this documentation
2. Review Playwright docs
3. Check existing issues in the repository
4. Create a new issue with details
