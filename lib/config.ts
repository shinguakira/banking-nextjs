/**
 * Application Configuration
 * 
 * Central place for configuration and environment checks
 */

/**
 * Check if the app should use mock data instead of real APIs
 */
export const isMockMode = (): boolean => {
  // Check environment variable
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return true;
  }

  // Check if required API keys are missing (auto-enable mock mode)
  const hasAppwriteConfig = !!(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT &&
    process.env.APPWRITE_DATABASE_ID
  );

  const hasPlaidConfig = !!(
    process.env.PLAID_CLIENT_ID &&
    process.env.PLAID_SECRET
  );

  const hasDwollaConfig = !!(
    process.env.DWOLLA_KEY &&
    process.env.DWOLLA_SECRET
  );

  // If any required config is missing, use mock data
  if (!hasAppwriteConfig || !hasPlaidConfig || !hasDwollaConfig) {
    console.log('⚠️  Missing API configuration, using mock data mode');
    return true;
  }

  return false;
};

/**
 * Get the current mode (mock or real)
 */
export const getAppMode = (): 'mock' | 'real' => {
  return isMockMode() ? 'mock' : 'real';
};

/**
 * Log current configuration mode
 */
export const logConfigMode = () => {
  const mode = getAppMode();
  if (mode === 'mock') {
    console.log('🎭 Running in MOCK DATA mode');
    console.log('   - No external APIs required');
    console.log('   - All data is simulated');
    console.log('   - Changes are not persisted');
  } else {
    console.log('🔌 Running in REAL API mode');
    console.log('   - Using Appwrite, Plaid, and Dwolla');
  }
};

// Legacy export for backwards compatibility
export const useMockData = isMockMode;
