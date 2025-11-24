import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright configuration for Sauce Demo application
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for */
  timeout: 30 * 1000,

  /* Test execution settings */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporter configuration */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    /* Collect trace when retrying failed tests */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Browser context settings */
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    /* Action timeout */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  /* Global setup/teardown */
  globalSetup: require.resolve('./src/config/global-setup.ts'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: /tests\/auth\/.*\.spec\.ts/,
    },
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/fixtures/auth/user.json',
      },
      testIgnore: /tests\/auth\/.*\.spec\.ts/,
      dependencies: ['setup'],
    },
  ],

  /* Output folders */
  outputDir: 'run-results/',
});
