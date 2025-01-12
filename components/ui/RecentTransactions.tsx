import Link from 'next/link'
import React from 'react'

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
                <Link href={`/transaction-history/?id=${appwriteItemId}`}>
                </Link>
        </header>
    </section>
  )
}

export default RecentTransactions