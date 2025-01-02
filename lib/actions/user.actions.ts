"use server";
import {ID,Query} from "node-appwrite";
import { parseStringify } from '../utils';
import {createAdminClient,createSessionClient}from "../appwrite";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
}= process.env;

export const getUserInfo = async({userId}:getUserInfoProps) =>{
    try{
        const {database} = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID,
            USER_COLLECTION_ID!,
            [Query.equal("userId",[userId])]
        )
        return parseStringify(user.documents[0]);
    }catch(error){
        console.log(error);
    }
}


export async function getLoggedInUser () {
    try{
        const {account} = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({userId: result.$id})

        return parseStringify(user);
    }catch(error){
        console.log(error);
        return null;
    }
}

export const createBankAccount = async({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) =>{
    try{
        const {database} = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABSE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }
        )
        return parseStringify(bankAccount);
    }catch(error){
        console.log(error);
    }
}

export const getBank = async({documentId}: getBankProps) => {
    try{
        const {database} = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("$id",[documentId])]
        );

        return parseStringify(bank.documents[0]);
    }catch(error){
        console.log(error);
    }
}

export const getBanks = async ({userId}:getBanksProps) =>{
    try{
        const {database} = await createAdminClient();

        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("userId",[userId])]
        )
        return parseStringify(banks.documents);
    }catch(error){
        console.log(error);
    }
}