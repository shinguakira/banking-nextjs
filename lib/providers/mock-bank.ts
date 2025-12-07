/**
 * Mock Bank Provider
 * 
 * Provides bank and account data functionality using mock data instead of Plaid
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseStringify } from '../utils';
import mockState from '../data/mock-state';

/**
 * Get multiple bank accounts for a user
 */
export const mockGetAccounts = async ({ userId }: { userId: string }) => {
  try {
    const banks = mockState.getBanksByUserId(userId);

    if (!banks || banks.length === 0) {
      return parseStringify({ data: [], totalBanks: 0, totalCurrentBalance: 0 });
    }

    const accounts = banks.map((bank: any) => {
      const account = mockState.getAccountById(bank.accountId);
      const institution = mockState.getInstitutionById(bank.institutionId);

      if (!account || !institution) {
        return null;
      }

      return {
        id: account.account_id,
        availableBalance: account.balances.available,
        currentBalance: account.balances.current,
        institutionId: institution.institution_id,
        name: account.name,
        officialName: account.official_name,
        mask: account.mask,
        type: account.type,
        subtype: account.subtype,
        appwriteItemId: bank.$id,
        sharaebleId: bank.shareableId,
      };
    }).filter(Boolean);

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total: number, account: any) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("Mock get accounts error:", error);
    throw error;
  }
};

/**
 * Get a single bank account with transaction history
 */
export const mockGetAccount = async ({ appwriteItemId }: { appwriteItemId: string }) => {
  try {
    const bank = mockState.getBankById(appwriteItemId);
    
    if (!bank) {
      throw new Error("Bank not found");
    }

    const account = mockState.getAccountById(bank.accountId);
    const institution = mockState.getInstitutionById(bank.institutionId);

    if (!account || !institution) {
      throw new Error("Account or institution not found");
    }

    // Get Plaid transactions
    const plaidTransactions = mockState.getTransactionsByAccountId(bank.accountId);

    // Get transfer transactions
    const transferTxs = mockState.getTransferTransactionsByBankId(bank.$id);

    // Format Plaid transactions
    const formattedPlaidTransactions = plaidTransactions.map((tx: any) => ({
      id: tx.transaction_id,
      name: tx.name,
      paymentChannel: tx.payment_channel,
      type: tx.payment_channel,
      accountId: tx.account_id,
      amount: tx.amount,
      pending: tx.pending,
      category: tx.category,
      date: tx.date,
      image: tx.logo_url,
    }));

    // Format transfer transactions
    const formattedTransferTransactions = transferTxs.map((tx: any) => ({
      id: tx.$id,
      name: tx.name,
      amount: parseFloat(tx.amount),
      date: tx.$createdAt,
      paymentChannel: tx.channel,
      category: tx.category,
      type: tx.senderBankId === bank.$id ? "debit" : "credit",
    }));

    // Combine and sort transactions
    const allTransactions = [...formattedPlaidTransactions, ...formattedTransferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const accountData = {
      id: account.account_id,
      availableBalance: account.balances.available,
      currentBalance: account.balances.current,
      institutionId: institution.institution_id,
      name: account.name,
      officialName: account.official_name,
      mask: account.mask,
      type: account.type,
      subtype: account.subtype,
      appwriteItemId: bank.$id,
    };

    return parseStringify({
      data: accountData,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("Mock get account error:", error);
    throw error;
  }
};

/**
 * Get institution information
 */
export const mockGetInstitution = async ({ institutionId }: { institutionId: string }) => {
  try {
    const institution = mockState.getInstitutionById(institutionId);
    
    if (!institution) {
      throw new Error("Institution not found");
    }

    return parseStringify(institution);
  } catch (error) {
    console.error("Mock get institution error:", error);
    throw error;
  }
};

/**
 * Get transactions for an account
 */
export const mockGetTransactions = async ({ accessToken }: { accessToken: string }) => {
  try {
    // Find the bank with this access token
    const bank = mockState.getBanks().find((b: any) => b.accessToken === accessToken);
    
    if (!bank) {
      return parseStringify([]);
    }

    const transactions = mockState.getTransactionsByAccountId(bank.accountId);

    const formattedTransactions = transactions.map((tx: any) => ({
      id: tx.transaction_id,
      name: tx.name,
      paymentChannel: tx.payment_channel,
      type: tx.payment_channel,
      accountId: tx.account_id,
      amount: tx.amount,
      pending: tx.pending,
      category: tx.category,
      date: tx.date,
      image: tx.logo_url,
    }));

    return parseStringify(formattedTransactions);
  } catch (error) {
    console.error("Mock get transactions error:", error);
    return parseStringify([]);
  }
};

/**
 * Create a bank account (when linking a new bank)
 */
export const mockCreateBankAccount = async (bankData: any) => {
  try {
    const newBank = mockState.createBank(bankData);
    return parseStringify(newBank);
  } catch (error) {
    console.error("Mock create bank account error:", error);
    throw error;
  }
};

/**
 * Get bank by document ID
 */
export const mockGetBank = async ({ documentId }: { documentId: string }) => {
  try {
    const bank = mockState.getBankById(documentId);
    
    if (!bank) {
      throw new Error("Bank not found");
    }

    return parseStringify(bank);
  } catch (error) {
    console.error("Mock get bank error:", error);
    throw error;
  }
};

/**
 * Get banks by user ID
 */
export const mockGetBanks = async ({ userId }: { userId: string }) => {
  try {
    const banks = mockState.getBanksByUserId(userId);
    return parseStringify(banks);
  } catch (error) {
    console.error("Mock get banks error:", error);
    throw error;
  }
};

/**
 * Get bank by account ID
 */
export const mockGetBankByAccountId = async ({ accountId }: { accountId: string }) => {
  try {
    const bank = mockState.getBankByAccountId(accountId);
    
    if (!bank) {
      return null;
    }

    return parseStringify(bank);
  } catch (error) {
    console.error("Mock get bank by account ID error:", error);
    throw error;
  }
};
