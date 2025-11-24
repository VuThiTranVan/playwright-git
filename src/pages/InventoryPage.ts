import { Page, expect } from '@playwright/test';
import { inventorySelectors } from '../../locales/ja/selectors/inventory.selectors';
import { BasePage } from './BasePage';

/**
 * InventoryPage - Page Object for Sauce Demo inventory/products page
 * Handles all product listing and shopping interactions
 */
export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to inventory page
   */
  async goto(): Promise<void> {
    await super.goto('inventory.html');
    await this.waitForPageLoad();
  }

  /**
   * Assert inventory page is loaded
   */
  async assertInventoryPageLoaded(): Promise<void> {
    await expect(this.page.locator(inventorySelectors.pageTitle)).toBeVisible();
    await expect(this.page.locator(inventorySelectors.inventoryContainer)).toBeVisible();
    await expect(this.page.locator(inventorySelectors.pageTitle)).toHaveText('Products');
  }

  /**
   * Get page title text
   * @returns Page title text
   */
  async getPageTitle(): Promise<string | null> {
    return await this.getText(inventorySelectors.pageTitle);
  }

  /**
   * Get count of products displayed
   * @returns Number of products
   */
  async getProductCount(): Promise<number> {
    return await this.page.locator(inventorySelectors.inventoryItem).count();
  }

  /**
   * Get all product names
   * @returns Array of product names
   */
  async getAllProductNames(): Promise<string[]> {
    const productElements = await this.page.locator(inventorySelectors.inventoryItemName).all();
    const names: string[] = [];

    for (const element of productElements) {
      const text = await element.textContent();
      if (text) names.push(text.trim());
    }

    return names;
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product to add
   */
  async addProductToCart(productName: string): Promise<void> {
    const productNameSelector = `${inventorySelectors.inventoryItem}:has-text("${productName}")`;
    const addButton = this.page.locator(
      `${productNameSelector} ${inventorySelectors.addToCartButton}`
    );
    await addButton.click();
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product to remove
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productNameSelector = `${inventorySelectors.inventoryItem}:has-text("${productName}")`;
    const removeButton = this.page.locator(
      `${productNameSelector} ${inventorySelectors.removeButton}`
    );
    await removeButton.click();
  }

  /**
   * Get shopping cart item count
   * @returns Number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    const badge = this.page.locator(inventorySelectors.shoppingCartBadge);
    const isVisible = await badge.isVisible();

    if (!isVisible) return 0;

    const text = await badge.textContent();
    return text ? parseInt(text, 10) : 0;
  }

  /**
   * Click on shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    await this.click(inventorySelectors.shoppingCartLink);
  }

  /**
   * Sort products
   * @param option - Sort option value (az, za, lohi, hilo)
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.page.locator(inventorySelectors.productSortContainer).selectOption(option);
  }

  /**
   * Get product price by name
   * @param productName - Name of the product
   * @returns Product price as string
   */
  async getProductPrice(productName: string): Promise<string | null> {
    const productSelector = `${inventorySelectors.inventoryItem}:has-text("${productName}")`;
    const priceElement = this.page.locator(
      `${productSelector} ${inventorySelectors.inventoryItemPrice}`
    );
    return await priceElement.textContent();
  }

  /**
   * Click on product name to view details
   * @param productName - Name of the product
   */
  async clickProductName(productName: string): Promise<void> {
    await this.page
      .locator(`${inventorySelectors.inventoryItemName}:has-text("${productName}")`)
      .click();
  }

  /**
   * Open burger menu
   */
  async openMenu(): Promise<void> {
    await this.click(inventorySelectors.burgerMenu);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.waitForSelector(inventorySelectors.logoutLink, { state: 'visible' });
    await this.click(inventorySelectors.logoutLink);
  }

  /**
   * Assert cart badge shows expected count
   * @param expectedCount - Expected number of items
   */
  async assertCartItemCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.page.locator(inventorySelectors.shoppingCartBadge)).toBeHidden();
    } else {
      await expect(this.page.locator(inventorySelectors.shoppingCartBadge)).toHaveText(
        expectedCount.toString()
      );
    }
  }

  /**
   * Assert product is visible on the page
   * @param productName - Name of the product
   */
  async assertProductVisible(productName: string): Promise<void> {
    const productLocator = this.page.locator(
      `${inventorySelectors.inventoryItemName}:has-text("${productName}")`
    );
    await expect(productLocator).toBeVisible();
  }
}
