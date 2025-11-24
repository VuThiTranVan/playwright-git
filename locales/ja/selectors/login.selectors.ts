/**
 * Login page selectors
 * All selectors for the login page elements
 */
export const loginSelectors = {
  // Input fields
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',

  // Buttons
  loginButton: '[data-test="login-button"]',

  // Error messages
  errorMessage: '[data-test="error"]',
  errorButton: '.error-button',

  // Logo and branding
  logo: '.login_logo',
  botImage: '.bot_column',

  // Form container
  loginContainer: '.login_container',
  loginForm: '.login-box',
} as const;
