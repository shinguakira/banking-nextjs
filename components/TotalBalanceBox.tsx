import React from 'react'
import { formatAmount } from '../lib/utils';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

function TotalBalanceBox({
    accounts=[],totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) {
  return (
    <section className="total-balance">
        <div className="total-balance-chart">
            <DoughnutChart accounts={accounts} />
        </div>
        <div className='flex flex-coll gap=6'>
            <h2 className='hader-2'>
                Bank Accounts: {totalBanks}
            </h2>
            <div className="flex flex-col gap-2">
                <p className="total-balance-label">
                    Total Current Balance
                </p>
                <div className="total-balance-amout flex-center gap-2">
                    <AnimatedCounter amount={100}/>
                    {formatAmount(totalCurrentBalance)}
                </div>
            </div>
        </div>
    </section>
  )
}

export default TotalBalanceBox