import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Global setup - validates environment before running tests
 */
async function globalSetup() {
  const required = ['USER_NAME', 'USER_PASSWORD', 'BASE_URL'];
  const missing = required.filter((v) => !process.env[v]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  // eslint-disable-next-line no-console
  console.log(`✓ Environment validated - ${process.env.BASE_URL}`);
}

export default globalSetup;
