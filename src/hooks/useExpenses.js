import { useState, useEffect } from 'react';
import expenseApi from '../api/expenseApi';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await expenseApi.getAll();
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses');
    }
    setLoading(false);
  };

  const deleteExpense = async (id) => {
    await expenseApi.delete(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return { expenses, loading, error, fetchExpenses, deleteExpense };
};

export default useExpenses;