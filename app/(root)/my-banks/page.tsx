import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import BankCard from "@/components/BankCard"

const MyBanks = async() => {
  const loggedIn = await getLoggedInUser();
  
  if (!loggedIn) {
    return <div>Please log in to view your banks.</div>;
  }
  
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })
  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Banks"
          subtext="Effortlessly manage your banking activites."
        />
        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((account: Account)=>(
              <BankCard
              key = {accounts.id}
              account={account}
              userName={loggedIn?.firstName} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks