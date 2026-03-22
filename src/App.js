import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import AIAssistant from './components/ai/AIAssistant';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import VerifyOtp from './features/auth/VerifyOtp';
import ScanExpense from './features/expenses/ScanExpense';
import ExpenseList from './features/expenses/ExpenseList';
import ExpenseDetail from './features/expenses/ExpenseDetail';
import Dashboard from './features/dashboard/Dashboard';
import BudgetTracker from './features/budget/BudgetTracker';
import { ROUTES } from './constants/appConstants';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
            {/* Public routes - no navbar, no auth required */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtp />} />

            {/* Protected routes - require authentication */}
            <Route path="/*" element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;