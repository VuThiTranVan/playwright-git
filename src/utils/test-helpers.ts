import { Page, expect } from '@playwright/test';

/**
 * Wait utilities for common test scenarios
 */
export class WaitHelpers {
  /**
   * Wait for element to be visible
   * @param page - Playwright page object
   * @param selector - Element selector
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForVisible(page: Page, selector: string, timeout?: number): Promise<void> {
    await expect(page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Wait for element to be hidden
   * @param page - Playwright page object
   * @param selector - Element selector
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForHidden(page: Page, selector: string, timeout?: number): Promise<void> {
    await expect(page.locator(selector)).toBeHidden({ timeout });
  }

  /**
   * Wait for URL to match pattern
   * @param page - Playwright page object
   * @param pattern - URL pattern to match
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForURL(page: Page, pattern: string | RegExp, timeout?: number): Promise<void> {
    await page.waitForURL(pattern, { timeout });
  }

  /**
   * Wait for DOM content to be loaded
   * @param page - Playwright page object
   */
  static async waitForDOMContentLoaded(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for specific text to appear
   * @param page - Playwright page object
   * @param text - Text to wait for
   * @param timeout - Optional timeout in milliseconds
   */
  static async waitForText(page: Page, text: string, timeout?: number): Promise<void> {
    await expect(page.getByText(text)).toBeVisible({ timeout });
  }
}

/**
 * Common test data helpers
 */
export class TestDataHelpers {
  /**
   * Generate random string
   * @param length - Length of the string
   * @returns Random string
   */
  static generateRandomString(length: number = 10): string {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }

  /**
   * Generate timestamp-based unique identifier
   * @returns Unique identifier
   */
  static generateUniqueId(): string {
    return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get current timestamp in readable format
   * @returns Formatted timestamp
   */
  static getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}

/**
 * Screenshot and debugging helpers
 */
export class DebugHelpers {
  /**
   * Take screenshot with custom name
   * @param page - Playwright page object
   * @param name - Screenshot name
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = TestDataHelpers.getTimestamp();
    await page.screenshot({
      path: `test-results/screenshots/${name}_${timestamp}.png`,
      fullPage: true,
    });
  }

  /**
   * Log current URL and title
   * @param page - Playwright page object
   */
  static async logPageInfo(page: Page): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(`Current URL: ${page.url()}`);
    // eslint-disable-next-line no-console
    console.log(`Page Title: ${await page.title()}`);
  }

  /**
   * Save page HTML
   * @param page - Playwright page object
   * @param filename - Output filename
   */
  static async savePageHTML(page: Page, filename: string): Promise<void> {
    const html = await page.content();
    const fs = await import('fs');
    const path = await import('path');
    const filepath = path.join('test-results', 'html', `${filename}.html`);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, html);
  }
}
