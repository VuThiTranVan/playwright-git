import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../src/pages/LoginPage';

const authFile = path.join(__dirname, '../../src/fixtures/auth/user.json');

/**
 * Authentication setup for standard user
 * This runs before all tests and stores the authenticated state
 */
setup('authenticate as user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.goto();

  // Perform login
  await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);

  // Wait for successful navigation to inventory page
  await page.waitForURL('**/inventory.html');

  // Save authenticated state
  await page.context().storageState({ path: authFile });

  // eslint-disable-next-line no-console
  console.log('✓ User authentication completed successfully');
});
