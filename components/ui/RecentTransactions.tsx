import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Link from 'next/link'
import React from 'react'
import { BankTabItem } from './BankTabItem';
import TransactionsTable from './TransactionsTable';

const RecentTransactions = ({accounts,transactions=[],appwriteItemId,page=1}:RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  );
    return (
    <section className="recent-transactions">
        <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">Recent transactions</h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`}
                className="view-all-btn">
                  View all
                </Link>
        </header>
        <Tabs defaultValue={appwriteItemId} className="w-full">
          <TabsList className="recent-transactions-tablist">
            {accounts.map((account: Account) => {
              <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem 
                key={account.id}
                account={account} 
                appwriteItemId={appwriteItemId}/>
              </TabsTrigger>
            })}
          </TabsList>
          {accounts.map((account: Account)=>{
            <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
            >
              <BankInfo 
                account={account}
                appwriteItemId={appwriteItemId}
                type="full"
              />
              <TransactionsTable transactions={}/>
            </TabsContent>
          })}
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

    </section>
  )
}

export default RecentTransactions