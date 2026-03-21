export const formatCurrency = (amount, currency = 'INR') => {
  if (!amount) return '₹0.00';
  const symbols = { INR: '₹', USD: '$', EUR: '€' };
  const symbol = symbols[currency] || currency;
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

export const getCurrencySymbol = (currency = 'INR') => {
  const symbols = { INR: '₹', USD: '$', EUR: '€' };
  return symbols[currency] || currency;
};