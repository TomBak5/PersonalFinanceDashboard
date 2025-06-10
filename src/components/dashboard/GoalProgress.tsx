import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const GoalProgress: React.FC = () => {
  const { goals } = useFinanceStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
      
      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.slice(0, 3).map((goal) => {
            const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{goal.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill bg-primary-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No goals set yet.</p>
      )}
    </div>
  );
};

export default GoalProgress; 