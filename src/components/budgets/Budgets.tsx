import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const Budgets: React.FC = () => {
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

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-danger-500';
    if (percentage >= 75) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">Track your spending against your budget goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const progressPercentage = getProgressPercentage(budget.spent, budget.amount);
          const remaining = budget.amount - budget.spent;
          
          return (
            <div key={budget.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                <span className="text-sm text-gray-500 capitalize">{budget.period}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-medium">{formatCurrency(budget.spent)}</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getProgressColor(progressPercentage)}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">{formatCurrency(budget.amount)}</span>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className={`font-semibold ${remaining >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {budgets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No budgets set up yet. Create your first budget to start tracking!</p>
        </div>
      )}
    </div>
  );
};

export default Budgets; 