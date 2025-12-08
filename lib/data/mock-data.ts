/**
 * Mock Data for Banking App - API Independent Operation
 * 
 * This file contains all mock data needed to run the app without external APIs.
 * Data includes users, banks, accounts, transactions, and institutions.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export const MOCK_USERS = [
  {
    $id: "mock-user-1",
    userId: "mock-user-1",
    email: "demo@banking.com",
    password: "demo12345", // In real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    address1: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    dateOfBirth: "1990-01-15",
    ssn: "***-**-1234", // Masked for display
    dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/mock-customer-1",
    dwollaCustomerId: "mock-customer-1",
  },
  {
    $id: "mock-user-2",
    userId: "mock-user-2",
    email: "jane.smith@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    address1: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90001",
    dateOfBirth: "1985-05-20",
    ssn: "***-**-5678",
    dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/mock-customer-2",
    dwollaCustomerId: "mock-customer-2",
  },
];

export const MOCK_INSTITUTIONS = [
  {
    institution_id: "ins_56",
    name: "Chase",
    products: ["assets", "auth", "balance", "transactions", "identity"],
    country_codes: ["US"],
    logo: null,
    primary_color: "0071ce",
    url: "https://www.chase.com",
  },
  {
    institution_id: "ins_127989",
    name: "Bank of America",
    products: ["assets", "auth", "balance", "transactions", "identity"],
    country_codes: ["US"],
    logo: null,
    primary_color: "e31837",
    url: "https://www.bankofamerica.com",
  },
  {
    institution_id: "ins_116944",
    name: "Wells Fargo",
    products: ["assets", "auth", "balance", "transactions", "identity"],
    country_codes: ["US"],
    logo: null,
    primary_color: "d71e28",
    url: "https://www.wellsfargo.com",
  },
];

export const MOCK_BANKS = [
  {
    $id: "mock-bank-1",
    accountId: "mock-account-chase-001",
    bankId: "mock-item-chase-1",
    userId: "mock-user-1",
    accessToken: "mock-access-token-chase",
    fundingSourceUrl: "https://api-sandbox.dwolla.com/funding-sources/mock-funding-1",
    shareableId: "mock-sharable-chase-001",
    institutionId: "ins_56",
  },
  {
    $id: "mock-bank-2",
    accountId: "mock-account-bofa-001",
    bankId: "mock-item-bofa-1",
    userId: "mock-user-1",
    accessToken: "mock-access-token-bofa",
    fundingSourceUrl: "https://api-sandbox.dwolla.com/funding-sources/mock-funding-2",
    shareableId: "mock-sharable-bofa-001",
    institutionId: "ins_127989",
  },
  {
    $id: "mock-bank-3",
    accountId: "mock-account-wells-001",
    bankId: "mock-item-wells-1",
    userId: "mock-user-1",
    accessToken: "mock-access-token-wells",
    fundingSourceUrl: "https://api-sandbox.dwolla.com/funding-sources/mock-funding-3",
    shareableId: "mock-sharable-wells-001",
    institutionId: "ins_116944",
  },
];

export const MOCK_ACCOUNTS = [
  {
    id: "mock-account-chase-001",
    account_id: "mock-account-chase-001",
    name: "Chase Checking",
    official_name: "Chase Total Checking",
    mask: "4321",
    type: "depository",
    subtype: "checking",
    balances: {
      available: 15420.50,
      current: 15420.50,
    },
    appwriteItemId: "mock-bank-1",
    shareableId: "mock-sharable-chase-001",
    institutionId: "ins_56",
  },
  {
    id: "mock-account-bofa-001",
    account_id: "mock-account-bofa-001",
    name: "BofA Savings",
    official_name: "Bank of America Advantage Savings",
    mask: "8765",
    type: "depository",
    subtype: "savings",
    balances: {
      available: 8750.25,
      current: 8750.25,
    },
    appwriteItemId: "mock-bank-2",
    shareableId: "mock-sharable-bofa-001",
    institutionId: "ins_127989",
  },
  {
    id: "mock-account-wells-001",
    account_id: "mock-account-wells-001",
    name: "Wells Fargo Credit",
    official_name: "Wells Fargo Platinum Credit Card",
    mask: "1234",
    type: "credit",
    subtype: "credit card",
    balances: {
      available: 4580.00,
      current: -1420.00, // Negative for credit cards (amount owed)
    },
    appwriteItemId: "mock-bank-3",
    shareableId: "mock-sharable-wells-001",
    institutionId: "ins_116944",
  },
];

// Generate mock transactions
const generateMockTransactions = () => {
  const categories = ["Food and Drink", "Travel", "Transfer", "Shopping", "Entertainment", "Bills", "Healthcare"];
  const paymentChannels = ["online", "in store", "other"];
  const merchants = [
    "Starbucks",
    "Whole Foods",
    "Amazon",
    "Netflix",
    "Uber",
    "Shell Gas Station",
    "CVS Pharmacy",
    "Target",
    "McDonald's",
    "Best Buy",
    "Home Depot",
    "Costco",
    "Walmart",
    "Delta Airlines",
    "Marriott Hotel",
    "Apple Store",
    "Spotify",
    "AT&T",
    "Pacific Gas & Electric",
    "California Water Service",
  ];

  const transactions: any[] = [];
  const accounts = ["mock-account-chase-001", "mock-account-bofa-001"];
  
  // Generate transactions for the last 90 days
  const today = new Date();
  let transactionId = 1;

  for (let i = 0; i < 60; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const transactionDate = new Date(today);
    transactionDate.setDate(transactionDate.getDate() - daysAgo);
    
    const accountId = accounts[Math.floor(Math.random() * accounts.length)];
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = parseFloat((Math.random() * 500 + 5).toFixed(2));
    const isCredit = Math.random() > 0.8; // 20% are credits (refunds, deposits)
    
    transactions.push({
      id: `mock-transaction-${transactionId}`,
      transaction_id: `mock-transaction-${transactionId}`,
      account_id: accountId,
      name: merchant,
      amount: isCredit ? -amount : amount,
      date: transactionDate.toISOString().split('T')[0],
      category: category,
      payment_channel: paymentChannels[Math.floor(Math.random() * paymentChannels.length)],
      pending: i < 3, // First 3 transactions are pending
      logo_url: null,
    });
    
    transactionId++;
  }

  // Sort by date descending
  return transactions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const MOCK_TRANSACTIONS = generateMockTransactions();

// Mock transfer transactions (stored separately in the app's transaction collection)
export const MOCK_TRANSFER_TRANSACTIONS = [
  {
    $id: "mock-transfer-1",
    $createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    name: "Transfer to Jane Smith",
    amount: "250.00",
    senderId: "mock-user-1",
    senderBankId: "mock-bank-1",
    receiverId: "mock-user-2",
    receiverBankId: "mock-bank-2",
    email: "jane.smith@example.com",
    channel: "online",
    category: "Transfer",
  },
  {
    $id: "mock-transfer-2",
    $createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    name: "Received from Freelance Work",
    amount: "1500.00",
    senderId: "mock-user-2",
    senderBankId: "mock-bank-2",
    receiverId: "mock-user-1",
    receiverBankId: "mock-bank-1",
    email: "demo@banking.com",
    channel: "online",
    category: "Transfer",
  },
];

// Export helper functions
export const getMockUserByEmail = (email: string) => {
  return MOCK_USERS.find(user => user.email === email);
};

export const getMockUserById = (userId: string) => {
  return MOCK_USERS.find(user => user.$id === userId || user.userId === userId);
};

export const getMockBanksByUserId = (userId: string) => {
  return MOCK_BANKS.filter(bank => bank.userId === userId);
};

export const getMockBankById = (bankId: string) => {
  return MOCK_BANKS.find(bank => bank.$id === bankId);
};

export const getMockBankByAccountId = (accountId: string) => {
  return MOCK_BANKS.find(bank => bank.accountId === accountId);
};

export const getMockAccountById = (accountId: string) => {
  return MOCK_ACCOUNTS.find(account => account.account_id === accountId);
};

export const getMockInstitutionById = (institutionId: string) => {
  return MOCK_INSTITUTIONS.find(inst => inst.institution_id === institutionId);
};

export const getMockTransactionsByAccountId = (accountId: string) => {
  return MOCK_TRANSACTIONS.filter(tx => tx.account_id === accountId);
};

export const getMockTransferTransactionsByBankId = (bankId: string) => {
  return MOCK_TRANSFER_TRANSACTIONS.filter(
    tx => tx.senderBankId === bankId || tx.receiverBankId === bankId
  );
};
