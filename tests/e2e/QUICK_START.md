# E2E Testing Quick Start Guide

## Installation

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# All tests
npm run e2e

# With UI (recommended for development)
npm run e2e:ui

# Headed mode (see browser)
npm run e2e:headed

# Debug mode
npm run e2e:debug

# View report
npm run e2e:report
```

## Common Commands

```bash
# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific file
npx playwright test home.spec.ts

# Run specific test
npx playwright test -g "should load home page"

# Update visual snapshots
npx playwright test --update-snapshots

# Run only accessibility tests
npx playwright test accessibility.spec.ts

# Run mobile tests
npx playwright test --project="Mobile Chrome"
```

## Test Structure

- `specs/` - Test files
- `pages/` - Page objects
- `fixtures/` - Test fixtures and data
- `helpers/` - Utility functions

## Writing New Tests

1. Use page objects from `fixtures/baseFixtures.ts`
2. Add test data to `fixtures/testData.ts`
3. Follow existing patterns in `specs/` directory

Example:

```typescript
import { test, expect } from '../fixtures/baseFixtures';

test('my test', async ({ homePage }) => {
  await homePage.goto();
  await homePage.verifyPageLoaded();
  await expect(homePage.mainTitle).toBeVisible();
});
```

## CI/CD

Tests run automatically on:
- Push to main/develop
- Pull requests
- Manual workflow dispatch

## Need Help?

See full documentation: `tests/e2e/README.md`
