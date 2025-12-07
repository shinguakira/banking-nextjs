/**
 * Mock Transaction Provider
 * 
 * Provides transaction functionality using mock data
 */

import { parseStringify } from '../utils';
import mockState from '../data/mock-state';

/**
 * Create a new transaction (for transfers)
 */
export const mockCreateTransaction = async (transactionData: any) => {
  try {
    const newTransaction = mockState.createTransferTransaction(transactionData);
    return parseStringify(newTransaction);
  } catch (error) {
    console.error("Mock create transaction error:", error);
    throw error;
  }
};

/**
 * Get transactions by bank ID
 */
export const mockGetTransactionsByBankId = async ({ bankId }: { bankId: string }) => {
  try {
    const transactions = mockState.getTransferTransactionsByBankId(bankId);

    return parseStringify({
      total: transactions.length,
      documents: transactions,
    });
  } catch (error) {
    console.error("Mock get transactions by bank ID error:", error);
    throw error;
  }
};

/**
 * Simulate a transfer between accounts
 */
export const mockCreateTransfer = async (params: {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}) => {
  try {
    // In mock mode, we just return success
    // The actual balance updates happen in mockSimulateTransfer
    return parseStringify({
      transferUrl: `https://api-sandbox.dwolla.com/transfers/mock-${Date.now()}`,
      status: "processed",
    });
  } catch (error) {
    console.error("Mock create transfer error:", error);
    throw error;
  }
};

/**
 * Complete transfer simulation (updates balances and creates transaction)
 */
export const mockSimulateTransfer = async (params: {
  senderBankId: string;
  receiverBankId: string;
  amount: number;
  senderUserId: string;
  receiverUserId: string;
  email: string;
  name: string;
}) => {
  try {
    const transfer = mockState.simulateTransfer(params);
    return parseStringify(transfer);
  } catch (error) {
    console.error("Mock simulate transfer error:", error);
    throw error;
  }
};
