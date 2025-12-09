/**
 * Mock Authentication Provider
 * 
 * Provides authentication functionality using mock data instead of Appwrite
 */

import { parseStringify } from '../utils';
import mockState from '../data/mock-state';

/**
 * Sign up a new user
 */
export const mockSignUp = async (userData: SignUpParams) => {
  try {
    // Check if user already exists
    const existingUser = mockState.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const newUser = mockState.createUser({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address1: userData.address1,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      dateOfBirth: userData.dateOfBirth,
      ssn: userData.ssn,
      password: userData.password,
      dwollaCustomerUrl: `https://api-sandbox.dwolla.com/customers/mock-${Date.now()}`,
      dwollaCustomerId: `mock-${Date.now()}`,
    });

    // Create session
    const sessionSecret = `mock-session-${Date.now()}`;
    mockState.setSession(newUser.$id, sessionSecret);

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-session', JSON.stringify({ userId: newUser.$id, sessionSecret }));
    }

    return parseStringify(newUser);
  } catch (error) {
    console.error("Mock sign up error:", error);
    throw error;
  }
};

/**
 * Sign in an existing user
 */
export const mockSignIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = mockState.getUserByEmail(email);
    
    if (!user) {
      throw new Error("User not found");
    }

    // In a real app, we would verify password hash
    // For mock, we just check if password is provided
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    // Create session
    const sessionSecret = `mock-session-${Date.now()}`;
    mockState.setSession(user.$id, sessionSecret);

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-session', JSON.stringify({ userId: user.$id, sessionSecret }));
    }

    return parseStringify(user);
  } catch (error) {
    console.error("Mock sign in error:", error);
    throw error;
  }
};

/**
 * Get the currently logged in user
 */
export const mockGetLoggedInUser = async () => {
  try {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock-session');
      if (stored) {
        const { userId } = JSON.parse(stored);
        const user = mockState.getUserById(userId);
        if (user) {
          return parseStringify(user);
        }
      }
    }

    // Check in-memory session
    const session = mockState.getSession();
    if (session) {
      const user = mockState.getUserById(session.userId);
      if (user) {
        return parseStringify(user);
      }
    }

    // For demo purposes, return the first mock user (demo@banking.com) by default
    // This allows the app to work without authentication for screenshots
    const demoUser = mockState.getUserByEmail('demo@banking.com');
    if (demoUser) {
      return parseStringify(demoUser);
    }

    return null;
  } catch (error) {
    console.error("Mock get logged in user error:", error);
    return null;
  }
};

/**
 * Get user info by user ID
 */
export const mockGetUserInfo = async ({ userId }: { userId: string }) => {
  try {
    const user = mockState.getUserById(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Mock get user info error:", error);
    throw error;
  }
};

/**
 * Logout the current user
 */
export const mockLogout = async () => {
  try {
    // Clear session
    mockState.clearSession();

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock-session');
    }

    return true;
  } catch (error) {
    console.error("Mock logout error:", error);
    return false;
  }
};

/**
 * Create a mock link token for Plaid
 */
export const mockCreateLinkToken = async (user: User) => {
  try {
    // Return a mock link token
    return parseStringify({
      linkToken: `mock-link-token-${user.$id}-${Date.now()}`,
    });
  } catch (error) {
    console.error("Mock create link token error:", error);
    throw error;
  }
};

/**
 * Exchange public token (mock implementation)
 */
export const mockExchangePublicToken = async ({
  user,
}: {
  publicToken: string;
  user: User;
}) => {
  try {
    // In mock mode, we just create a new bank account with random data
    const newBank = mockState.createBank({
      accountId: `mock-account-${Date.now()}`,
      bankId: `mock-item-${Date.now()}`,
      userId: user.$id,
      accessToken: `mock-access-token-${Date.now()}`,
      fundingSourceUrl: `https://api-sandbox.dwolla.com/funding-sources/mock-${Date.now()}`,
      shareableId: `mock-sharable-${Date.now()}`,
      institutionId: "ins_56", // Default to Chase
    });

    return parseStringify({
      publicTokenExchange: "complete",
      bank: newBank,
    });
  } catch (error) {
    console.error("Mock exchange public token error:", error);
    throw error;
  }
};
