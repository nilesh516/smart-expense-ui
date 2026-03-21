import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import AIAssistant from './components/ai/AIAssistant';
import ScanExpense from './features/expenses/ScanExpense';
import ExpenseList from './features/expenses/ExpenseList';
import ExpenseDetail from './features/expenses/ExpenseDetail';
import Dashboard from './features/dashboard/Dashboard';
import BudgetTracker from './features/budget/BudgetTracker';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<ScanExpense />} />
                <Route path="/expenses" element={<ExpenseList />} />
                <Route path="/expenses/:id" element={<ExpenseDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/budget" element={<BudgetTracker />} />
              </Routes>
            </div>
            <AIAssistant />
          </div>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;