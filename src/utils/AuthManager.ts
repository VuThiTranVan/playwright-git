import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

/**
 * AuthManager handles authentication operations for tests
 * Manages user authentication state and storage
 */
export class AuthManager {
  private page: Page;
  private authDir: string;

  constructor(page: Page) {
    this.page = page;
    this.authDir = path.join(__dirname, '../fixtures/auth');
    this.ensureAuthDirectory();
  }

  /**
   * Ensure the auth directory exists
   */
  private ensureAuthDirectory(): void {
    if (!fs.existsSync(this.authDir)) {
      fs.mkdirSync(this.authDir, { recursive: true });
    }
  }

  /**
   * Authenticate as standard user
   * @param username - User's username
   * @param password - User's password
   * @returns Promise that resolves when authentication is complete
   */
  async authenticateAsUser(username: string, password: string): Promise<void> {
    const loginPage = new LoginPage(this.page);

    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for successful login
    await this.page.waitForURL('**/inventory.html');
  }

  /**
   * Save current authentication state to file
   * @param filename - Name of the file to save state (without path)
   */
  async saveAuthState(filename: string = 'user.json'): Promise<void> {
    const authFile = path.join(this.authDir, filename);
    await this.page.context().storageState({ path: authFile });
  }

  /**
   * Check if user is currently authenticated
   * @returns true if authenticated, false otherwise
   */
  async isAuthenticated(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes('inventory.html') || !currentUrl.includes('saucedemo.com');
  }

  /**
   * Get path to auth state file
   * @param filename - Name of the auth state file
   */
  getAuthStatePath(filename: string = 'user.json'): string {
    return path.join(this.authDir, filename);
  }

  /**
   * Clear authentication state
   */
  async clearAuthState(): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.context().clearPermissions();
  }
}
