import { Locator, Page, expect } from '@playwright/test';

/**
 * BasePage - Foundation class for all page objects
 * Provides common functionality and utilities for page interactions
 */
export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL || 'https://www.saucedemo.com/';
  }

  /**
   * Navigate to a specific path
   * @param path - URL path to navigate to
   */
  async goto(path: string = ''): Promise<void> {
    const url = path ? `${this.baseURL}${path}` : this.baseURL;
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click on an element
   * @param selector - Element selector
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field
   * @param selector - Input selector
   * @param value - Value to fill
   */
  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Get text content of an element
   * @param selector - Element selector
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   * @param selector - Element selector
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   * @param selector - Element selector
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForSelector(selector: string, timeout?: number): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  /**
   * Get locator for element
   * @param selector - Element selector
   */
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Take screenshot
   * @param filename - Screenshot filename
   */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${filename}.png`,
      fullPage: true,
    });
  }

  /**
   * Assert element is visible
   * @param selector - Element selector
   */
  async assertVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert element contains text
   * @param selector - Element selector
   * @param text - Expected text
   */
  async assertText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Reload the page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }
}
