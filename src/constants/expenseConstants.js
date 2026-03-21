export const EXPENSE_CATEGORIES = {
  FOOD: 'Food & Dining',
  TRAVEL: 'Travel',
  SHOPPING: 'Shopping',
  UTILITIES: 'Utilities',
  HEALTHCARE: 'Healthcare',
  ENTERTAINMENT: 'Entertainment',
  OTHER: 'Other'
};

export const PAYMENT_METHODS = {
  CASH: 'Cash',
  UPI: 'UPI',
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  UNKNOWN: 'Unknown'
};

// Maps category names to CSS badge classes
export const CATEGORY_BADGE_MAP = {
  [EXPENSE_CATEGORIES.FOOD]: 'badge-food',
  [EXPENSE_CATEGORIES.TRAVEL]: 'badge-travel',
  [EXPENSE_CATEGORIES.SHOPPING]: 'badge-shopping',
  [EXPENSE_CATEGORIES.UTILITIES]: 'badge-utilities',
  [EXPENSE_CATEGORIES.HEALTHCARE]: 'badge-healthcare',
  DEFAULT: 'badge-other'
};

export const SCAN_TABS = {
  IMAGE: 'image',
  TEXT: 'text'
};