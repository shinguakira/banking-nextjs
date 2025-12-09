"use server";

import {
  mockGetAccounts,
  mockGetAccount,
  mockGetInstitution,
  mockGetTransactions,
} from "../providers/mock-bank";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  return mockGetAccounts({ userId });
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  return mockGetAccount({ appwriteItemId });
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  return mockGetInstitution({ institutionId });
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  return mockGetTransactions({ accessToken });
};