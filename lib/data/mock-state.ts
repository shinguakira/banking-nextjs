/**
 * Mock State Management
 * 
 * Provides in-memory state management for mock data.
 * This allows us to simulate state changes (transfers, new banks, etc.)
 * without persisting to a real database.
 */

import {
  MOCK_USERS,
  MOCK_BANKS,
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  MOCK_TRANSFER_TRANSACTIONS,
  MOCK_INSTITUTIONS,
} from './mock-data';

// Deep clone to avoid mutating original data
let users = JSON.parse(JSON.stringify(MOCK_USERS));
let banks = JSON.parse(JSON.stringify(MOCK_BANKS));
let accounts = JSON.parse(JSON.stringify(MOCK_ACCOUNTS));
let transactions = JSON.parse(JSON.stringify(MOCK_TRANSACTIONS));
let transferTransactions = JSON.parse(JSON.stringify(MOCK_TRANSFER_TRANSACTIONS));
const institutions = JSON.parse(JSON.stringify(MOCK_INSTITUTIONS));

// Session storage for current user
let currentSession: { userId: string; sessionSecret: string } | null = null;

/**
 * Reset all data to initial state
 */
export const resetMockState = () => {
  users = JSON.parse(JSON.stringify(MOCK_USERS));
  banks = JSON.parse(JSON.stringify(MOCK_BANKS));
  accounts = JSON.parse(JSON.stringify(MOCK_ACCOUNTS));
  transactions = JSON.parse(JSON.stringify(MOCK_TRANSACTIONS));
  transferTransactions = JSON.parse(JSON.stringify(MOCK_TRANSFER_TRANSACTIONS));
  currentSession = null;
};

// User operations
export const mockState = {
  // Session management
  setSession: (userId: string, sessionSecret: string) => {
    currentSession = { userId, sessionSecret };
  },

  getSession: () => currentSession,

  clearSession: () => {
    currentSession = null;
  },

  // User operations
  getUsers: () => users,

  getUserById: (userId: string) => {
    return users.find((u: any) => u.$id === userId || u.userId === userId);
  },

  getUserByEmail: (email: string) => {
    return users.find((u: any) => u.email === email);
  },

  createUser: (userData: any) => {
    const newUser = {
      $id: `mock-user-${Date.now()}`,
      userId: `mock-user-${Date.now()}`,
      ...userData,
    };
    users.push(newUser);
    return newUser;
  },

  // Bank operations
  getBanks: () => banks,

  getBanksByUserId: (userId: string) => {
    return banks.filter((b: any) => b.userId === userId);
  },

  getBankById: (bankId: string) => {
    return banks.find((b: any) => b.$id === bankId);
  },

  getBankByAccountId: (accountId: string) => {
    return banks.find((b: any) => b.accountId === accountId);
  },

  createBank: (bankData: any) => {
    const newBank = {
      $id: `mock-bank-${Date.now()}`,
      ...bankData,
    };
    banks.push(newBank);
    return newBank;
  },

  // Account operations
  getAccounts: () => accounts,

  getAccountById: (accountId: string) => {
    return accounts.find((a: any) => a.account_id === accountId || a.id === accountId);
  },

  getAccountsByUserId: (userId: string) => {
    const userBanks = banks.filter((b: any) => b.userId === userId);
    const bankIds = userBanks.map((b: any) => b.accountId);
    return accounts.filter((a: any) => bankIds.includes(a.account_id));
  },

  updateAccountBalance: (accountId: string, amount: number) => {
    const account = accounts.find((a: any) => a.account_id === accountId || a.id === accountId);
    if (account) {
      account.balances.available += amount;
      account.balances.current += amount;
    }
    return account;
  },

  // Transaction operations
  getTransactions: () => transactions,

  getTransactionsByAccountId: (accountId: string) => {
    return transactions.filter((t: any) => t.account_id === accountId);
  },

  addTransaction: (transaction: any) => {
    const newTransaction = {
      id: `mock-transaction-${Date.now()}`,
      transaction_id: `mock-transaction-${Date.now()}`,
      ...transaction,
    };
    transactions.unshift(newTransaction); // Add to beginning
    return newTransaction;
  },

  // Transfer transaction operations
  getTransferTransactions: () => transferTransactions,

  getTransferTransactionsByBankId: (bankId: string) => {
    return transferTransactions.filter(
      (t: any) => t.senderBankId === bankId || t.receiverBankId === bankId
    );
  },

  createTransferTransaction: (transferData: any) => {
    const newTransfer = {
      $id: `mock-transfer-${Date.now()}`,
      $createdAt: new Date().toISOString(),
      channel: "online",
      category: "Transfer",
      ...transferData,
    };
    transferTransactions.unshift(newTransfer); // Add to beginning
    return newTransfer;
  },

  // Institution operations
  getInstitutions: () => institutions,

  getInstitutionById: (institutionId: string) => {
    return institutions.find((i: any) => i.institution_id === institutionId);
  },

  // Complex operations

  /**
   * Simulate a transfer between two accounts
   */
  simulateTransfer: (params: {
    senderBankId: string;
    receiverBankId: string;
    amount: number;
    senderUserId: string;
    receiverUserId: string;
    email: string;
    name: string;
  }) => {
    const { senderBankId, receiverBankId, amount, senderUserId, receiverUserId, email, name } = params;

    // Get the banks
    const senderBank = banks.find((b: any) => b.$id === senderBankId);
    const receiverBank = banks.find((b: any) => b.$id === receiverBankId);

    if (!senderBank || !receiverBank) {
      throw new Error("Bank not found");
    }

    // Get the accounts
    const senderAccount = accounts.find((a: any) => a.account_id === senderBank.accountId);
    const receiverAccount = accounts.find((a: any) => a.account_id === receiverBank.accountId);

    if (!senderAccount || !receiverAccount) {
      throw new Error("Account not found");
    }

    // Check sufficient balance
    if (senderAccount.balances.available < amount) {
      throw new Error("Insufficient funds");
    }

    // Update balances
    senderAccount.balances.available -= amount;
    senderAccount.balances.current -= amount;
    receiverAccount.balances.available += amount;
    receiverAccount.balances.current += amount;

    // Create transfer transaction
    const transfer = mockState.createTransferTransaction({
      name,
      amount: amount.toString(),
      senderId: senderUserId,
      senderBankId,
      receiverId: receiverUserId,
      receiverBankId,
      email,
    });

    return transfer;
  },

  /**
   * Get account with full details
   */
  getAccountWithDetails: (accountId: string) => {
    const account = accounts.find((a: any) => a.account_id === accountId || a.id === accountId);
    if (!account) return null;

    const bank = banks.find((b: any) => b.accountId === account.account_id);
    if (!bank) return null;

    const institution = institutions.find((i: any) => i.institution_id === bank.institutionId);

    return {
      account,
      bank,
      institution,
    };
  },
};

export default mockState;
