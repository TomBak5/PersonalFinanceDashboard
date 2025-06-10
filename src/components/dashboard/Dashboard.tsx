import React from 'react';
import { useFinanceStore } from '../../store/financeStore';
import StatsCards from './StatsCards';
import ExpenseChart from './ExpenseChart';
import BudgetOverview from './BudgetOverview';
import RecentTransactions from './RecentTransactions';
import GoalProgress from './GoalProgress';

const Dashboard: React.FC = () => {
  const { stats, isLoading } = useFinanceStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseChart />
          <BudgetOverview />
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          <GoalProgress />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 