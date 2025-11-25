# Sauce Demo - Playwright Automation Project

Single-site, single-role E2E testing automation cho [Sauce Demo](https://www.saucedemo.com/) sử dụng Playwright với TypeScript và Page Object Model.

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: ≥ 18.x
- **pnpm**: ≥ 10.x (package manager)
- **Git**: Để quản lý version control

## 🚀 Cài Đặt

1. **Clone repository**:

```bash
git clone <repository-url>
cd playwright-git
```

2. **Cài đặt pnpm** (nếu chưa có):

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

3. **Cài đặt dependencies**:

```bash
pnpm install
```

4. **Cài đặt browsers**:

```bash
pnpm exec playwright install
```

5. **Cấu hình môi trường**:

```bash
cp .env.example .env
```

Chỉnh sửa `.env` với thông tin đúng:

```
USER_NAME=standard_user
USER_PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com/
```

## 📁 Cấu Trúc Project

```
playwright-git/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD workflow (sử dụng pnpm)
├── locales/
│   └── ja/
│       └── selectors/
│           ├── login.selectors.ts  # Selectors cho trang Login
│           └── inventory.selectors.ts # Selectors cho trang Inventory
├── src/
│   ├── config/
│   │   └── global-setup.ts         # Global setup và validation
│   ├── fixtures/
│   │   └── auth/
│   │       └── user.json           # Authentication state (auto-generated)
│   ├── pages/
│   │   ├── BasePage.ts             # Base class cho các Page Objects
│   │   ├── LoginPage.ts            # Page Object cho Login
│   │   ├── InventoryPage.ts        # Page Object cho Inventory
│   │   └── index.ts                # Export các Page Objects
│   └── utils/
│       ├── AuthManager.ts          # Authentication utilities
│       └── test-helpers.ts         # Test helper functions
├── tests/
│   ├── auth/
│   │   ├── auth.setup.ts           # Authentication setup script
│   │   └── login.spec.ts           # Login test cases (1 test)
│   └── inventory/
│       └── inventory.spec.ts       # Inventory test cases (6 tests)
├── .env.example                    # Environment variables template
├── .eslintrc.js                    # ESLint configuration
├── .gitignore                      # Git ignore patterns
├── .prettierrc                     # Prettier configuration
├── package.json                    # Project dependencies (pnpm)
├── pnpm-lock.yaml                  # pnpm lockfile
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## 🧪 Chạy Tests

### Chạy tất cả tests

```bash
pnpm test
```

### Chạy tests với UI mode

```bash
pnpm test:ui
```

### Chạy tests với headed mode (hiển thị browser)

```bash
pnpm test:headed
```

### Chạy tests cho specific browser

```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### Chạy specific test file

```bash
pnpm exec playwright test tests/auth/login.spec.ts
pnpm exec playwright test tests/inventory/inventory.spec.ts
```

## 🛠️ Development Commands

### Type checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint          # Check for issues
pnpm lint:fix      # Auto-fix issues
```

### Formatting

```bash
pnpm format        # Format all files with Prettier
```

## 🔍 Test Cases

### Authentication Tests (1 test)

- ✅ Login thành công với credentials hợp lệ

### Inventory Tests (6 tests)

- ✅ Hiển thị danh sách products
- ✅ Add product vào cart
- ✅ Remove product khỏi cart
- ✅ Hiển thị product information đúng
- ✅ Sort products A-Z
- ✅ Sort products Z-A

**Tổng số tests**: 7 test cases (chạy trên 3 browsers: Chromium, Firefox, WebKit)

## 🏗️ Architecture

### Page Object Model (POM)

- **BasePage**: Base class với common methods (click, fill, getText, etc.)
- **LoginPage**: Methods cho login operations
- **InventoryPage**: Methods cho product listing và cart operations

### Selector Management

- Selectors tập trung trong `locales/ja/selectors/`
- Sử dụng `data-test` attributes
- Dễ dàng maintain và update

### Authentication

- State-based authentication với reusable fixtures
- Setup chạy một lần, tái sử dụng cho nhiều tests
- Tối ưu thời gian chạy tests

## 🔧 Code Quality Tools

- **TypeScript**: Static type checking
- **ESLint**: Code linting với Playwright plugin
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks với lint-staged
- **pnpm**: Fast, disk space efficient package manager

## 📊 CI/CD

GitHub Actions workflow tự động:

- Chạy trên mỗi push/PR tới main/master branch
- Cài đặt dependencies với pnpm
- Chạy tất cả tests trên 3 browsers
- Upload test reports

## 🤝 Contributing

1. Tạo branch mới: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add some feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Tạo Pull Request

## 📝 License

MIT License
