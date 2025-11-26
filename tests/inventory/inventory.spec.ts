import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';

/**
 * Inventory Page Tests
 *
 */

test.describe('Inventory Page - Product Display', () => {
  test('should display all products on inventory page', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act - Navigate to inventory page
    await inventoryPage.goto();

    // Assert - Page is loaded correctly
    await inventoryPage.assertInventoryPageLoaded();

    // Assert - Products are displayed
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6); // Sauce Demo has 6 products

    // Assert - All products have names
    const productNames = await inventoryPage.getAllProductNames();
    expect(productNames.length).toBe(6);
    expect(productNames).toContain('Sauce Labs Backpack');
  });
});
