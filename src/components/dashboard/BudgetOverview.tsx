import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const BudgetOverview: React.FC = () => {
  const { budgets } = useFinanceStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProgressPercentage = (spent: number, total: number) => {
    return Math.min((spent / total) * 100, 100);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
      
      {budgets.length > 0 ? (
        <div className="space-y-4">
          {budgets.slice(0, 4).map((budget) => {
            const progressPercentage = getProgressPercentage(budget.spent, budget.amount);
            const isOverBudget = budget.spent > budget.amount;
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{budget.category}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${
                      isOverBudget ? 'bg-danger-500' : 
                      progressPercentage >= 75 ? 'bg-warning-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No budgets set up yet.</p>
      )}
    </div>
  );
};

export default BudgetOverview; 