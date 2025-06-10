import { create } from 'zustand';
import { Transaction, Budget, Goal, Asset, Account, FilterOptions, DashboardStats } from '../types';

interface FinanceState {
  // Data
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  assets: Asset[];
  accounts: Account[];
  stats: DashboardStats;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Filters
  filters: FilterOptions;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  fetchBudgets: () => Promise<void>;
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  
  fetchAssets: () => Promise<void>;
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  
  setFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  
  calculateStats: () => void;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    amount: 5000,
    type: 'income',
    category: 'Salary',
    description: 'Monthly salary',
    date: '2024-01-15',
    account: 'Checking',
    tags: ['work', 'regular'],
    recurring: true,
    recurringPeriod: 'monthly',
  },
  {
    id: '2',
    userId: '1',
    amount: 1200,
    type: 'expense',
    category: 'Housing',
    subcategory: 'Rent',
    description: 'Monthly rent payment',
    date: '2024-01-01',
    account: 'Checking',
    tags: ['housing', 'regular'],
    recurring: true,
    recurringPeriod: 'monthly',
  },
  {
    id: '3',
    userId: '1',
    amount: 450,
    type: 'expense',
    category: 'Food',
    subcategory: 'Groceries',
    description: 'Weekly groceries',
    date: '2024-01-10',
    account: 'Checking',
    tags: ['food', 'essential'],
    recurring: false,
  },
];

const mockBudgets: Budget[] = [
  {
    id: '1',
    userId: '1',
    category: 'Food',
    amount: 800,
    spent: 450,
    period: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  {
    id: '2',
    userId: '1',
    category: 'Entertainment',
    amount: 300,
    spent: 120,
    period: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
];

const mockGoals: Goal[] = [
  {
    id: '1',
    userId: '1',
    title: 'Emergency Fund',
    description: 'Build emergency fund for 6 months expenses',
    targetAmount: 15000,
    currentAmount: 8500,
    targetDate: '2024-12-31',
    category: 'savings',
    priority: 'high',
  },
  {
    id: '2',
    userId: '1',
    title: 'Vacation Fund',
    description: 'Save for summer vacation',
    targetAmount: 3000,
    currentAmount: 1200,
    targetDate: '2024-06-30',
    category: 'savings',
    priority: 'medium',
  },
];

const defaultFilters: FilterOptions = {
  dateRange: {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
  categories: [],
  accounts: [],
  transactionTypes: [],
  amountRange: {
    min: 0,
    max: 10000,
  },
};

export const useFinanceStore = create<FinanceState>((set, get) => ({
  // Initial state
  transactions: [],
  budgets: [],
  goals: [],
  assets: [],
  accounts: [],
  stats: {
    totalIncome: 0,
    totalExpenses: 0,
    netWorth: 0,
    savingsRate: 0,
    monthlyChange: 0,
  },
  isLoading: false,
  error: null,
  filters: defaultFilters,

  // Transaction actions
  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ transactions: mockTransactions, isLoading: false });
      get().calculateStats();
    } catch (error) {
      set({ error: 'Failed to fetch transactions', isLoading: false });
    }
  },

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    set(state => ({
      transactions: [...state.transactions, newTransaction],
    }));
    get().calculateStats();
  },

  updateTransaction: (id, updatedTransaction) => {
    set(state => ({
      transactions: state.transactions.map(t =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      ),
    }));
    get().calculateStats();
  },

  deleteTransaction: (id) => {
    set(state => ({
      transactions: state.transactions.filter(t => t.id !== id),
    }));
    get().calculateStats();
  },

  // Budget actions
  fetchBudgets: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ budgets: mockBudgets, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch budgets', isLoading: false });
    }
  },

  addBudget: (budget) => {
    const newBudget: Budget = {
      ...budget,
      id: Math.random().toString(36).substr(2, 9),
      spent: 0,
    };
    set(state => ({ budgets: [...state.budgets, newBudget] }));
  },

  updateBudget: (id, updatedBudget) => {
    set(state => ({
      budgets: state.budgets.map(b =>
        b.id === id ? { ...b, ...updatedBudget } : b
      ),
    }));
  },

  deleteBudget: (id) => {
    set(state => ({
      budgets: state.budgets.filter(b => b.id !== id),
    }));
  },

  // Goal actions
  fetchGoals: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ goals: mockGoals, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch goals', isLoading: false });
    }
  },

  addGoal: (goal) => {
    const newGoal: Goal = {
      ...goal,
      id: Math.random().toString(36).substr(2, 9),
      currentAmount: 0,
    };
    set(state => ({ goals: [...state.goals, newGoal] }));
  },

  updateGoal: (id, updatedGoal) => {
    set(state => ({
      goals: state.goals.map(g =>
        g.id === id ? { ...g, ...updatedGoal } : g
      ),
    }));
  },

  deleteGoal: (id) => {
    set(state => ({
      goals: state.goals.filter(g => g.id !== id),
    }));
  },

  // Asset actions
  fetchAssets: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ assets: [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch assets', isLoading: false });
    }
  },

  addAsset: (asset) => {
    const newAsset: Asset = {
      ...asset,
      id: Math.random().toString(36).substr(2, 9),
    };
    set(state => ({ assets: [...state.assets, newAsset] }));
  },

  updateAsset: (id, updatedAsset) => {
    set(state => ({
      assets: state.assets.map(a =>
        a.id === id ? { ...a, ...updatedAsset } : a
      ),
    }));
  },

  deleteAsset: (id) => {
    set(state => ({
      assets: state.assets.filter(a => a.id !== id),
    }));
  },

  // Filter actions
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({ filters: defaultFilters });
  },

  // Stats calculation
  calculateStats: () => {
    const { transactions } = get();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netWorth = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    set({
      stats: {
        totalIncome,
        totalExpenses,
        netWorth,
        savingsRate,
        monthlyChange: 0, // Would calculate from previous month data
      },
    });
  },
})); 