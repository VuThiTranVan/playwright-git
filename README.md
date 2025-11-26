# Sauce Demo - Playwright Test Automation

A production-ready Playwright testing framework for the Sauce Demo application, following Page Object Model (POM) design pattern and industry best practices.

## 🚀 Features

- ✅ **Page Object Model (POM)** architecture for maintainable tests
- ✅ **TypeScript** for type-safe test development
- ✅ **Multi-browser support** (Chromium, Firefox, WebKit)
- ✅ **Authentication state management** for faster test execution
- ✅ **Code quality tools** (ESLint, Prettier, Husky)
- ✅ **CI/CD ready** with GitHub Actions
- ✅ **Comprehensive test reporting**
- ✅ **Environment-based configuration**
- ✅ **Selector extraction** for easy maintenance

## 📁 Project Structure

```
playwright-git/
├── src/
│   ├── config/
│   │   └── global-setup.ts        # Global test setup & validation
│   ├── fixtures/
│   │   └── auth/
│   │       └── user.json          # Authentication state (generated)
│   ├── pages/                     # Page Object Models
│   │   ├── BasePage.ts            # Base page class
│   │   ├── LoginPage.ts           # Login page (1 page object)
│   │   ├── InventoryPage.ts       # Inventory page (1 page object)
│   │   └── index.ts               # Export all pages
│   └── utils/
│       ├── AuthManager.ts         # Authentication helper
│       └── test-helpers.ts        # Test utilities
├── tests/
│   ├── auth/
│   │   ├── auth.setup.ts          # Authentication setup
│   │   └── login.spec.ts          # 1 test case
│   └── inventory/
│       └── inventory.spec.ts      # 1 test case
├── locales/ja/selectors/          # Centralized selectors
│   ├── login.selectors.ts
│   └── inventory.selectors.ts
├── .github/workflows/
│   └── playwright.yml             # CI/CD pipeline
├── .vscode/                       # IDE settings
│   ├── settings.json              # Auto-format config
│   └── extensions.json            # Recommended extensions
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── .eslintrc.js                   # ESLint rules
├── .prettierrc                    # Code formatting
├── .gitignore                     # Git ignore rules
└── package.json                   # Dependencies & scripts
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd playwright-git
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with your credentials
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://www.saucedemo.com/
LOGIN_URL=https://www.saucedemo.com/
USER_NAME=standard_user
USER_PASSWORD=secret_sauce
```

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run tests for specific browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run specific test suite

```bash
npm run test:auth
```

### Debug tests

```bash
npm run test:debug
```

### View test report

```bash
npm run report
```

## 📝 Code Quality

### Linting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors
```

### Formatting

```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Type checking

```bash
npm run type-check    # Run TypeScript compiler check
```

## 🏗️ Architecture

### Page Object Model (POM)

This project follows the Page Object Model pattern:

1. **BasePage**: Foundation class with common page interactions
2. **Page Objects**: Specific page classes (LoginPage, InventoryPage)
3. **Selectors**: Centralized selector definitions in `locales/ja/selectors/`
4. **Test Files**: Clean, readable tests using page objects

### Authentication Strategy

- **Setup Project**: Runs authentication once before tests
- **State Reuse**: Saves authenticated state to `src/fixtures/auth/user.json`
- **Fast Execution**: Tests skip login by reusing stored state

## 📊 Test Coverage

### Current Test Suite (2 test cases)

**Authentication Tests** (`tests/auth/login.spec.ts`)

- ✅ 1 test: Successful login with valid credentials

**Inventory Tests** (`tests/inventory/inventory.spec.ts`)

- ✅ 1 test: Display all products on inventory page

**Total Execution**: 7 tests passed across 3 browsers

- 1× auth setup
- 3× login test (Chromium, Firefox, WebKit)
- 3× inventory test (1 test × 3 browsers)

### Page Objects (2)

- ✅ `LoginPage` - Complete login functionality
- ✅ `InventoryPage` - Product listing and cart operations

## 🎯 Writing Tests

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('Inventory Tests', () => {
  test('should add product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.assertCartItemCount(1);
  });
});
```

### Adding New Page Objects

1. Create selector file in `locales/ja/selectors/`
2. Create page object class extending `BasePage`
3. Implement page-specific methods
4. Export from `src/pages/index.ts`

## 🤖 CI/CD

Tests run automatically on:

- Push to main/master/develop branches
- Pull requests

Configure secrets in GitHub:

- `USER_NAME`
- `USER_PASSWORD`

## � Test Reports

After test execution, view reports at:

- **HTML Report**: `playwright-report/index.html` (open with `npm run report`)
- **JSON Results**: `test-results/results.json`
- **Screenshots**: `test-results/screenshots/` (on failure)
- **Videos**: `test-results/videos/` (on failure)
- **Traces**: Attached to failed tests for debugging

## 🔒 Security

- ✅ Credentials stored in `.env` (git-ignored)
- ✅ Auth state `user.json` (git-ignored)
- ✅ GitHub Actions secrets for CI/CD
- ✅ No sensitive data in repository

## 🤝 Contributing

1. Follow existing code structure and patterns
2. Use Page Object Model for new pages
3. Extract selectors to `locales/ja/selectors/`
4. Write clear, descriptive test names
5. Run linting and formatting before commit (automated with Husky)

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 📄 License

ISC

---

**Built with ❤️ using Playwright**
