"use server";

import {
    mockCreateTransaction,
    mockGetTransactionsByBankId,
    mockCreateTransfer,
} from "../providers/mock-transaction";

export const createTransaction = async(transaction:CreateTransactionProps) => {
    return mockCreateTransaction(transaction);
}

export const getTransactionsByBankId = async({bankId}:getTransactionsByBankIdProps) => {
    return mockGetTransactionsByBankId({ bankId });
}

export const createTransfer = async(params: TransferParams) => {
    console.log('Creating transfer with params:', params);
    return mockCreateTransfer();
}