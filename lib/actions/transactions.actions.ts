import {
    mockCreateTransaction,
    mockGetTransactionsByBankId,
} from "../providers/mock-transaction";
export const  createTransaction = async(transaction:CreateTransactionProps) => {
    return mockCreateTransaction(transaction);
}

export const  getTransactionsByBankId = async({bankId}:getTransactionsByBankIdProps) => {
    return mockGetTransactionsByBankId({ bankId });
}