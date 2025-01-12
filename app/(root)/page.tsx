import React from 'react'
import HeaderBox from '@/components/ui/HeaderBox';
import { getUserInfo ,getLoggedInUser} from '@/lib/actions/user.actions';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import RightSidebar from '@/components/ui/RightSidebar';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import RecentTransactions from '@/components/ui/RecentTransactions';

export const Home = async({searchParams: {id, page}}:SearchParamProps ) => {
  const currentPage = Number(page as string) || 1;// set first page as default
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn?.$id
  });
  if(!accounts) return;

  const accountsData =accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId});
  console.log(
    account,
    accountsData
  )

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account nad transactions efficiently"
            />
            <TotalBalanceBox 
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0,2)}/>
    </section>
  )
}

export default Home