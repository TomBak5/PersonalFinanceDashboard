import React from 'react';
import { DashboardStats } from '../../types';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BanknotesIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const statsData = [
    {
      name: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: BanknotesIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
    },
    {
      name: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: CreditCardIcon,
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-200',
    },
    {
      name: 'Net Worth',
      value: formatCurrency(stats.netWorth),
      icon: ScaleIcon,
      color: stats.netWorth >= 0 ? 'text-success-600' : 'text-danger-600',
      bgColor: stats.netWorth >= 0 ? 'bg-success-50' : 'bg-danger-50',
      borderColor: stats.netWorth >= 0 ? 'border-success-200' : 'border-danger-200',
    },
    {
      name: 'Savings Rate',
      value: formatPercentage(stats.savingsRate),
      icon: ArrowTrendingUpIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div
          key={stat.name}
          className={`stats-card border-l-4 ${stat.borderColor} animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              {stat.name === 'Net Worth' && stats.monthlyChange !== 0 && (
                <div className="flex items-center mt-2">
                  {stats.monthlyChange > 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-success-600 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-danger-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stats.monthlyChange > 0 ? 'text-success-600' : 'text-danger-600'
                    }`}
                  >
                    {formatCurrency(Math.abs(stats.monthlyChange))} this month
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards; 