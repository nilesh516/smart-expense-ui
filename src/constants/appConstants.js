export const APP = {
  NAME: process.env.REACT_APP_NAME || 'SmartExpense AI',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081'
};

export const ROUTES = {
  HOME: '/',
  EXPENSES: '/expenses',
  EXPENSE_DETAIL: '/expenses/:id',
  DASHBOARD: '/dashboard',
  BUDGET: '/budget',
  LOGIN: '/login',
  REGISTER: '/register'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};