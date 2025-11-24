import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';

/**
 * Authentication Tests
 * Tests for login functionality and user authentication
 */

test.describe('User Authentication', () => {
  test('should successfully login with valid credentials and navigate to inventory page', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    const username = process.env.USER_NAME!;
    const password = process.env.USER_PASSWORD!;

    // Act - Navigate to login page
    await loginPage.goto();

    // Assert - Login page is loaded
    await loginPage.assertLoginPageLoaded();

    // Act - Perform login
    await loginPage.login(username, password);

    // Assert - Successfully navigated to inventory page
    await page.waitForURL('**/inventory.html');
    await inventoryPage.assertInventoryPageLoaded();

    // Assert - Page title is correct
    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    // Assert - Products are loaded
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
