import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useFinanceStore } from './store/financeStore';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/dashboard/Dashboard';
import Transactions from './components/transactions/Transactions';
import Budgets from './components/budgets/Budgets';
import Goals from './components/goals/Goals';
import Assets from './components/assets/Assets';
import Layout from './components/layout/Layout';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { fetchTransactions, fetchBudgets, fetchGoals } = useFinanceStore();

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('auth_token');
    if (token && !isAuthenticated) {
      // In a real app, validate token with backend
      const mockUser = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        createdAt: new Date().toISOString(),
        settings: {
          currency: 'USD',
          theme: 'light' as const,
          notifications: true,
        },
      };
      useAuthStore.setState({ 
        user: mockUser, 
        isAuthenticated: true 
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch initial data when authenticated
      fetchTransactions();
      fetchBudgets();
      fetchGoals();
    }
  }, [isAuthenticated, fetchTransactions, fetchBudgets, fetchGoals]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 