import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useFinanceStore } from '../../store/financeStore';
import { ChartBarIcon } from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExpenseChart: React.FC = () => {
  const { transactions } = useFinanceStore();

  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: { [key: string]: number } = {};

    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    return {
      categories,
      amounts,
      total: amounts.reduce((sum, amount) => sum + amount, 0),
    };
  }, [transactions]);

  const barChartData = {
    labels: expenseData.categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenseData.amounts,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: expenseData.categories,
    datasets: [
      {
        data: expenseData.amounts,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false,
      },
    },
  };

  if (expenseData.categories.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-primary-600" />
            Expense Analysis
          </h3>
        </div>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No expense data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-primary-600" />
          Expense Analysis
        </h3>
        <div className="text-sm text-gray-600">
          Total: ${expenseData.total.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="h-64">
          <h4 className="text-sm font-medium text-gray-700 mb-3">By Category</h4>
          <Bar data={barChartData} options={chartOptions} />
        </div>

        {/* Doughnut Chart */}
        <div className="h-64">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Distribution</h4>
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart; 