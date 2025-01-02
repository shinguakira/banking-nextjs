"use server";

import {getBanks} from "./user.actions";
import {plaidClient} from "../plaid";
// get multiple bank accounts
export const getAccounts = async ({userId}:getAccountsProps) =>{
    try{
        // get banks from db
        const banks = await getBanks({userId});

        const accounts = await Promise.all(
            banks?.map(async(bank: Bank)=>{
                // get each account info from plaid
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const accountData = accountsResponse.data.accounts[0];

                // get institution info from plaid
                const institution = await  getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                const account = {
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available,
                    currentBalance: accountData.balances.current!,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask!,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    sharaebleId: bank.sharableId
                };
                return account;
            })
        );

        
    }
}