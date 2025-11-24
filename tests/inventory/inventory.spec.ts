import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';

/**
 * Inventory Page Tests
 * Tests for product listing and shopping cart functionality
 * These tests run with authenticated state
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

  test('should add product to cart successfully', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);
    const productName = 'Sauce Labs Backpack';

    // Act - Navigate to inventory page
    await inventoryPage.goto();

    // Assert - Initial cart is empty
    await inventoryPage.assertCartItemCount(0);
    const initialCount = await inventoryPage.getCartItemCount();
    expect(initialCount).toBe(0);

    // Act - Add product to cart
    await inventoryPage.addProductToCart(productName);

    // Assert - Cart count is updated
    await inventoryPage.assertCartItemCount(1);
    const countAfterFirstAdd = await inventoryPage.getCartItemCount();
    expect(countAfterFirstAdd).toBe(1);

    // Act - Add another product
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Assert - Cart count is updated
    await inventoryPage.assertCartItemCount(2);
    const finalCount = await inventoryPage.getCartItemCount();
    expect(finalCount).toBe(2);
  });

  test('should remove product from cart successfully', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);
    const productName = 'Sauce Labs Backpack';

    // Act - Navigate to inventory page
    await inventoryPage.goto();

    // Act - Add product to cart
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.assertCartItemCount(1);
    const countAfterAdd = await inventoryPage.getCartItemCount();
    expect(countAfterAdd).toBe(1);

    // Act - Remove product from cart
    await inventoryPage.removeProductFromCart(productName);

    // Assert - Cart is empty
    await inventoryPage.assertCartItemCount(0);
    const finalCount = await inventoryPage.getCartItemCount();
    expect(finalCount).toBe(0);
  });

  test('should display correct product information', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);
    const productName = 'Sauce Labs Backpack';

    // Act - Navigate to inventory page
    await inventoryPage.goto();

    // Assert - Product is visible
    await inventoryPage.assertProductVisible(productName);

    // Assert - Product has price
    const price = await inventoryPage.getProductPrice(productName);
    expect(price).toContain('$');
  });
});

test.describe('Inventory Page - Sorting', () => {
  test('should sort products by name A to Z', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act
    await inventoryPage.goto();
    await inventoryPage.sortProducts('az');

    // Assert - Products are sorted alphabetically
    const productNames = await inventoryPage.getAllProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('should sort products by name Z to A', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act
    await inventoryPage.goto();
    await inventoryPage.sortProducts('za');

    // Assert - Products are sorted reverse alphabetically
    const productNames = await inventoryPage.getAllProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });
});
