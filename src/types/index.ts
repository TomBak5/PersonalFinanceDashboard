export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  settings: UserSettings;
}

export interface UserSettings {
  currency: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  account: string;
  tags: string[];
  recurring: boolean;
  recurringPeriod?: 'weekly' | 'monthly' | 'yearly';
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'savings' | 'debt' | 'investment' | 'purchase';
  priority: 'low' | 'medium' | 'high';
}

export interface Asset {
  id: string;
  userId: string;
  name: string;
  type: 'cash' | 'investment' | 'property' | 'crypto' | 'other';
  value: number;
  currency: string;
  lastUpdated: string;
  performance?: AssetPerformance;
}

export interface AssetPerformance {
  change1d: number;
  change7d: number;
  change30d: number;
  change1y: number;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  institution: string;
  lastSynced?: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  savingsRate: number;
  monthlyChange: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  categories: string[];
  accounts: string[];
  transactionTypes: ('income' | 'expense')[];
  amountRange: {
    min: number;
    max: number;
  };
} 