import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdDelete } from 'react-icons/md';
import expenseApi from '../../api/expenseApi';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate, formatDateTime } from '../../utils/dateUtils';
import {
  MESSAGES,
  BUTTON_LABELS,
  LOADING_MESSAGES
} from '../../constants/uiText';
import { ROUTES } from '../../constants/appConstants';

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await expenseApi.getById(id);
        setExpense(data);
      } catch (err) {
        // Redirect to list if expense not found
        navigate(ROUTES.EXPENSES);
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm(MESSAGES.DELETE_CONFIRM)) {
      try {
        await expenseApi.delete(id);
        navigate(ROUTES.EXPENSES);
      } catch (err) {
        setError(MESSAGES.DELETE_ERROR);
      }
    }
  };

  if (loading) return <Loader message={LOADING_MESSAGES.DEFAULT} />;

  return (
    <div className="card">
      <div className="detail-header">
        <h2>Expense Details</h2>
        <div className="detail-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(ROUTES.EXPENSES)}
            aria-label="Go back to expense list"
          >
            <MdArrowBack size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {BUTTON_LABELS.BACK}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            aria-label="Delete this expense"
          >
            <MdDelete size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {BUTTON_LABELS.DELETE}
          </button>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="result-card">
        <div className="result-item">
          <label>ID</label>
          <span>#{expense.id}</span>
        </div>
        <div className="result-item">
          <label>Vendor</label>
          <span>{expense.vendor || 'N/A'}</span>
        </div>
        <div className="result-item">
          <label>Amount</label>
          <span className="amount-highlight amount-large">
            {formatCurrency(expense.amount, expense.currency)}
          </span>
        </div>
        <div className="result-item">
          <label>Date</label>
          <span>{formatDate(expense.date)}</span>
        </div>
        <div className="result-item">
          <label>Category</label>
          <span>{expense.category || 'N/A'}</span>
        </div>
        <div className="result-item">
          <label>Payment Method</label>
          <span>{expense.paymentMethod || 'N/A'}</span>
        </div>
        <div className="result-item">
          <label>Tax Amount</label>
          <span>{formatCurrency(expense.taxAmount || 0, expense.currency)}</span>
        </div>
        <div className="result-item">
          <label>Notes</label>
          <span>{expense.notes || 'N/A'}</span>
        </div>
        <div className="result-item">
          <label>Created At</label>
          <span>{formatDateTime(expense.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetail;