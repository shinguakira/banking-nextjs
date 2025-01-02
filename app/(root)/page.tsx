import React from 'react'
import HeaderBox from '@/components/ui/HeaderBox';
import { getUserInfo ,getLoggedInUser} from '@/lib/actions/user.actions';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import RightSidebar from '@/components/ui/RightSidebar';

export const Home = async( ) => {
  // const currentPage = Number(page as string) || 1;// set first page as default
  const loggedIn = {firstName: "Adrian", 
    lastName:"JSM",
    email:"contact@akirashingu.com"};
  // const accounts = await getAccountTypeColors({
  //   userId: loggedIn.$id
  // });
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
              accounts={[]}
              totalBanks={0}
              totalCurrentBalance={0}
            />
        </header>

        RECENT Transations
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.50},{currentBalance: 123.50}]}/>
    </section>
  )
}

export default Home