import { Page } from '@playwright/test';

/**
 * Test Helper Functions
 * Utility functions to support testing
 */

/**
 * Wait for all network requests to complete
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page, duration: number = 500) {
  await page.waitForTimeout(duration);
}

/**
 * Scroll to bottom of page
 */
export async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}

/**
 * Scroll to top of page
 */
export async function scrollToTop(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}

/**
 * Get viewport size
 */
export async function getViewportSize(page: Page) {
  return await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Clear browser storage
 */
export async function clearStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Set local storage item
 */
export async function setLocalStorageItem(page: Page, key: string, value: string) {
  await page.evaluate(
    ({ k, v }) => {
      localStorage.setItem(k, v);
    },
    { k: key, v: value }
  );
}

/**
 * Get local storage item
 */
export async function getLocalStorageItem(page: Page, key: string): Promise<string | null> {
  return await page.evaluate((k) => {
    return localStorage.getItem(k);
  }, key);
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  url: string,
  response: any,
  status: number = 200
) {
  await page.route(url, (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Wait for specific network request
 */
export async function waitForRequest(page: Page, urlPattern: string | RegExp) {
  return await page.waitForRequest(urlPattern);
}

/**
 * Wait for specific network response
 */
export async function waitForResponse(page: Page, urlPattern: string | RegExp) {
  return await page.waitForResponse(urlPattern);
}

/**
 * Get all console messages
 */
export async function getConsoleMessages(page: Page): Promise<string[]> {
  const messages: string[] = [];
  page.on('console', (msg) => messages.push(msg.text()));
  return messages;
}

/**
 * Get all console errors
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(
  page: Page,
  name: string,
  fullPage: boolean = true
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage,
  });
}

/**
 * Retry function until condition is met
 */
export async function retryUntil<T>(
  fn: () => Promise<T>,
  condition: (result: T) => boolean,
  maxRetries: number = 5,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    const result = await fn();
    if (condition(result)) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error(`Condition not met after ${maxRetries} retries`);
}
