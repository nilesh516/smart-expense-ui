import React, { createContext, useState, useContext, useCallback } from 'react';
import expenseApi from '../api/expenseApi';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await expenseApi.getAll();
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
    setLoading(false);
  }, []);

  const deleteExpense = async (id) => {
    await expenseApi.delete(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  // Summary stats for dashboard
  const getTotalAmount = () =>
    expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const getByCategory = () => {
    return expenses.reduce((acc, e) => {
      const cat = e.category || 'Other';
      acc[cat] = (acc[cat] || 0) + (e.amount || 0);
      return acc;
    }, {});
  };

  const getThisMonthExpenses = () => {
    const now = new Date();
    return expenses.filter(e => {
      if (!e.createdAt) return false;
      const d = new Date(e.createdAt);
      return d.getMonth() === now.getMonth() &&
             d.getFullYear() === now.getFullYear();
    });
  };

  return (
    <ExpenseContext.Provider value={{
      expenses, loading, error,
      fetchExpenses, deleteExpense, addExpense,
      getTotalAmount, getByCategory, getThisMonthExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);