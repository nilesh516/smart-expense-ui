export const PAGE_TITLES = {
  SCAN: 'Scan Receipt',
  EXPENSES: 'Expense History',
  DASHBOARD: 'Dashboard',
  BUDGET: 'Budget Tracker',
  LOGIN: 'Sign In',
  REGISTER: 'Create Account'
};

export const MESSAGES = {
  // Success messages
  SCAN_SUCCESS: 'Receipt scanned and saved successfully.',
  DELETE_SUCCESS: 'Expense deleted successfully.',

  // Error messages
  SCAN_ERROR: 'Failed to scan receipt. Please check your API credits.',
  FETCH_ERROR: 'Failed to load expenses. Please try again.',
  DELETE_ERROR: 'Failed to delete expense. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',

  // Info messages
  NO_EXPENSES: 'No expenses found. Start by scanning a receipt.',
  COMING_SOON: 'This feature is coming in the next phase.',
  AI_WELCOME: 'Hi! I am your SmartExpense AI assistant. Ask me anything about your expenses.',
  AI_COMING_SOON: 'AI Chat feature coming soon! For now, use the Scan Receipt feature to add expenses.',

  // Confirm messages
  DELETE_CONFIRM: 'Are you sure you want to delete this expense?'
};

export const PLACEHOLDERS = {
  EXPENSE_DESCRIPTION: 'e.g. Paid 450 rupees at Swiggy on 19th March via UPI for food order',
  AI_INPUT: 'Ask about your expenses...',
  SEARCH: 'Search expenses...'
};

export const BUTTON_LABELS = {
  SCAN_IMAGE: 'Scan Receipt',
  ANALYZE_TEXT: 'Analyze Expense',
  DELETE: 'Delete',
  BACK: 'Back',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  SEND: 'Send',
  LOGIN: 'Sign In',
  REGISTER: 'Create Account',
  LOGOUT: 'Sign Out'
};

export const TAB_LABELS = {
  UPLOAD_IMAGE: 'Upload Image',
  DESCRIBE_EXPENSE: 'Describe Expense'
};

export const LOADING_MESSAGES = {
  DEFAULT: 'Loading...',
  EXPENSES: 'Loading expenses...',
  SCANNING: 'Claude AI is analyzing your expense...',
  SAVING: 'Saving expense...'
};

export const COMING_SOON = {
  DASHBOARD: {
    title: 'Dashboard',
    description: 'Spending charts, category breakdown, and monthly trends.',
    phase: 'Phase 3'
  },
  BUDGET: {
    title: 'Budget Tracker',
    description: 'Set budgets, track spending, and get AI-powered alerts.',
    phase: 'Phase 6'
  }
};
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  OTP_SENT: 'Verification code sent to your email.',
  OTP_INVALID: 'Invalid OTP. Please try again.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'Email already registered. Please login instead.',
  LOGOUT_SUCCESS: 'You have been logged out.'
};

export const AUTH_PLACEHOLDERS = {
  NAME: 'Enter your full name',
  EMAIL: 'Enter your email address',
  PASSWORD: 'Enter your password',
  OTP: '······'
};

export const AUTH_LABELS = {
  NAME: 'Full Name',
  EMAIL: 'Email Address',
  PASSWORD: 'Password',
  OTP: 'Verification Code'
};