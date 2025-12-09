"use server";
import {
    mockGetUserInfo,
    mockSignIn,
    mockSignUp,
    mockGetLoggedInUser,
    mockLogout,
} from "../providers/mock-auth";
import {
    mockGetBank,
    mockGetBanks,
    mockGetBankByAccountId,
    mockCreateBankAccount,
} from "../providers/mock-bank";

export const getUserInfo = async({userId}:getUserInfoProps) =>{
    return mockGetUserInfo({ userId });
}

export const signIn = async({email ,password}: signInProps) => {
    return mockSignIn({ email, password });
}

export const signUp = async ({password, ...userData}: SignUpParams) => {
    return mockSignUp({ password, ...userData });
}


export async function getLoggedInUser () {
    return mockGetLoggedInUser();
}

export const logoutAccount = async() => {
    return mockLogout();
}

export const createBankAccount = async({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) =>{
    return mockCreateBankAccount({
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
    });
}

export const getBank = async({documentId}: getBankProps) => {
    return mockGetBank({ documentId });
}

export const getBanks = async ({userId}:getBanksProps) =>{
    return mockGetBanks({ userId });
}
export const getBankByAccountId = async({accountId}: getBankByAccountIdProps) => {
    return mockGetBankByAccountId({ accountId });
}