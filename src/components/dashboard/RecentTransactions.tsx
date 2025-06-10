import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const RecentTransactions: React.FC = () => {
  const { transactions } = useFinanceStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
      
      {recentTransactions.length > 0 ? (
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No transactions yet.</p>
      )}
    </div>
  );
};

export default RecentTransactions; 