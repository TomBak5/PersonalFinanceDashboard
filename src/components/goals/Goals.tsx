import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const Goals: React.FC = () => {
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

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger-100 text-danger-800';
      case 'medium': return 'bg-warning-100 text-warning-800';
      case 'low': return 'bg-success-100 text-success-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600 mt-1">Track your progress towards financial milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const remaining = goal.targetAmount - goal.currentAmount;
          const daysRemaining = getDaysRemaining(goal.targetDate);
          
          return (
            <div key={goal.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill bg-primary-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 block">Current</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(goal.currentAmount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Target</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600 block">Remaining</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(remaining)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 block">Days left</span>
                      <span className={`font-semibold ${daysRemaining < 30 ? 'text-danger-600' : 'text-gray-900'}`}>
                        {daysRemaining > 0 ? daysRemaining : 'Overdue'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {goals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No financial goals set yet. Create your first goal to start tracking!</p>
        </div>
      )}
    </div>
  );
};

export default Goals; 