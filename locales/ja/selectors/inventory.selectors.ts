/**
 * Inventory page selectors
 * All selectors for the inventory (products) page elements
 */
export const inventorySelectors = {
  // Page header
  pageTitle: '.title',
  appLogo: '.app_logo',

  // Product containers
  inventoryContainer: '.inventory_container',
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',

  // Product details
  inventoryItemName: '.inventory_item_name',
  inventoryItemDesc: '.inventory_item_desc',
  inventoryItemPrice: '.inventory_item_price',
  inventoryItemImg: '.inventory_item_img',

  // Buttons
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',

  // Cart
  shoppingCartLink: '.shopping_cart_link',
  shoppingCartBadge: '.shopping_cart_badge',

  // Sorting
  productSortContainer: '.product_sort_container',

  // Menu
  burgerMenu: '#react-burger-menu-btn',
  logoutLink: '#logout_sidebar_link',
} as const;
