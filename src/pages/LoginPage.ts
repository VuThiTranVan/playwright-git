import { Page, expect } from '@playwright/test';
import { loginSelectors } from '../../locales/ja/selectors/login.selectors';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object for Sauce Demo login page
 * Handles all login-related interactions
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForPageLoad();
  }

  /**
   * Perform login with username and password
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Fill username field
   * @param username - Username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.fill(loginSelectors.usernameInput, username);
  }

  /**
   * Fill password field
   * @param password - Password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.fill(loginSelectors.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(loginSelectors.loginButton);
  }

  /**
   * Get error message text
   * @returns Error message text or null
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.getText(loginSelectors.errorMessage);
  }

  /**
   * Check if error message is visible
   * @returns true if error is visible, false otherwise
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.isVisible(loginSelectors.errorMessage);
  }

  /**
   * Assert login page is loaded
   */
  async assertLoginPageLoaded(): Promise<void> {
    await expect(this.page.locator(loginSelectors.logo)).toBeVisible();
    await expect(this.page.locator(loginSelectors.usernameInput)).toBeVisible();
    await expect(this.page.locator(loginSelectors.passwordInput)).toBeVisible();
    await expect(this.page.locator(loginSelectors.loginButton)).toBeVisible();
  }

  /**
   * Assert error message is displayed
   * @param expectedMessage - Expected error message text
   */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.page.locator(loginSelectors.errorMessage)).toBeVisible();
    await expect(this.page.locator(loginSelectors.errorMessage)).toContainText(expectedMessage);
  }

  /**
   * Clear username field
   */
  async clearUsername(): Promise<void> {
    await this.page.locator(loginSelectors.usernameInput).clear();
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.page.locator(loginSelectors.passwordInput).clear();
  }

  /**
   * Get available usernames from the page
   * (Sauce Demo displays test users on the login page)
   */
  async getAvailableUsernames(): Promise<string[]> {
    const loginCredentials = await this.page.locator('#login_credentials').textContent();
    if (!loginCredentials) return [];

    const usernames = loginCredentials
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && line !== 'Accepted usernames are:');

    return usernames;
  }
}
