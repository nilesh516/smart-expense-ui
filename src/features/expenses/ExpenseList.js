import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdReceipt } from 'react-icons/md';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';
import { CATEGORY_BADGE_MAP } from '../../constants/expenseConstants';
import {
  PAGE_TITLES,
  MESSAGES,
  LOADING_MESSAGES,
  BUTTON_LABELS
} from '../../constants/uiText';
import { ROUTES } from '../../constants/appConstants';
import useExpenses from '../../hooks/useExpenses';

function ExpenseList() {
  const navigate = useNavigate();
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    deleteExpense
  } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleRowClick = (id) => {
    navigate(ROUTES.EXPENSES + `/${id}`);
  };

  const handleDelete = async (e, id) => {
    // Prevent row click from firing when delete is clicked
    e.stopPropagation();
    if (window.confirm(MESSAGES.DELETE_CONFIRM)) {
      await deleteExpense(id);
    }
  };

  const getBadgeClass = (category) => {
    if (!category) return `badge ${CATEGORY_BADGE_MAP.DEFAULT}`;
    return `badge ${CATEGORY_BADGE_MAP[category] || CATEGORY_BADGE_MAP.DEFAULT}`;
  };

  if (loading) return <Loader message={LOADING_MESSAGES.EXPENSES} />;

  return (
    <div className="card">
      <h2>
        {PAGE_TITLES.EXPENSES}
        <span className="record-count">({expenses.length})</span>
      </h2>

      {error && <Alert type="error" message={error} />}

      {expenses.length === 0 ? (
        <div className="empty-state">
          <MdReceipt size={60} className="empty-state-icon" />
          <p>{MESSAGES.NO_EXPENSES}</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  onClick={() => handleRowClick(expense.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View expense from ${expense.vendor}`}
                >
                  <td>{expense.id}</td>
                  <td>{expense.vendor || 'N/A'}</td>
                  <td className="amount-highlight">
                    {formatCurrency(expense.amount, expense.currency)}
                  </td>
                  <td>
                    <span className={getBadgeClass(expense.category)}>
                      {expense.category || 'N/A'}
                    </span>
                  </td>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.paymentMethod || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => handleDelete(e, expense.id)}
                      aria-label={`Delete expense ${expense.id}`}
                    >
                      <MdDelete size={16} />
                      {BUTTON_LABELS.DELETE}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;