import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdCloudUpload, MdSearch, MdTextFields } from 'react-icons/md';
import expenseApi from '../../api/expenseApi';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateUtils';
import {
  SCAN_TABS,
  CATEGORY_BADGE_MAP
} from '../../constants/expenseConstants';
import {
  PAGE_TITLES,
  MESSAGES,
  PLACEHOLDERS,
  BUTTON_LABELS,
  TAB_LABELS,
  LOADING_MESSAGES
} from '../../constants/uiText';

function ScanExpense() {
  const [activeTab, setActiveTab] = useState(SCAN_TABS.IMAGE);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetState = () => {
    setError('');
    setSuccess('');
    setResult(null);
  };

  const handleImageScan = async () => {
    if (!file) {
      setError('Please select a receipt image.');
      return;
    }
    resetState();
    setLoading(true);
    try {
      const data = await expenseApi.scanImage(file);
      setResult(data);
      setSuccess(MESSAGES.SCAN_SUCCESS);
    } catch (err) {
      setError(MESSAGES.SCAN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleTextScan = async () => {
    if (!description.trim()) {
      setError('Please enter an expense description.');
      return;
    }
    resetState();
    setLoading(true);
    try {
      const data = await expenseApi.scanText(description);
      setResult(data);
      setSuccess(MESSAGES.SCAN_SUCCESS);
    } catch (err) {
      setError(MESSAGES.SCAN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (category) => {
    if (!category) return `badge ${CATEGORY_BADGE_MAP.DEFAULT}`;
    return `badge ${CATEGORY_BADGE_MAP[category] || CATEGORY_BADGE_MAP.DEFAULT}`;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetState();
    setFile(null);
    setDescription('');
  };

  return (
    <div>
      <div className="card">
        <h2>{PAGE_TITLES.SCAN}</h2>

        <div className="tabs">
          <div
            className={`tab ${activeTab === SCAN_TABS.IMAGE ? 'active' : ''}`}
            onClick={() => handleTabChange(SCAN_TABS.IMAGE)}
            role="button"
            tabIndex={0}
            aria-selected={activeTab === SCAN_TABS.IMAGE}
          >
            <MdCloudUpload size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {TAB_LABELS.UPLOAD_IMAGE}
          </div>
          <div
            className={`tab ${activeTab === SCAN_TABS.TEXT ? 'active' : ''}`}
            onClick={() => handleTabChange(SCAN_TABS.TEXT)}
            role="button"
            tabIndex={0}
            aria-selected={activeTab === SCAN_TABS.TEXT}
          >
            <MdTextFields size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {TAB_LABELS.DESCRIBE_EXPENSE}
          </div>
        </div>

        <Alert
          type="error"
          message={error}
          onClose={() => setError('')}
        />
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess('')}
        />

        {activeTab === SCAN_TABS.IMAGE && (
          <div>
            <div
              className="upload-area"
              onClick={() => document.getElementById('fileInput').click()}
              role="button"
              tabIndex={0}
              aria-label="Upload receipt image"
            >
              <MdCloudUpload size={48} className="upload-icon" />
              <p>{file ? file.name : 'Click to upload receipt image'}</p>
              <p className="upload-hint">Supports JPG, PNG</p>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="btn btn-primary"
              onClick={handleImageScan}
              disabled={loading || !file}
            >
              <MdSearch size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {loading ? 'Scanning...' : BUTTON_LABELS.SCAN_IMAGE}
            </button>
          </div>
        )}

        {activeTab === SCAN_TABS.TEXT && (
          <div>
            <div className="form-group">
              <label htmlFor="expenseDescription">Describe your expense</label>
              <textarea
                id="expenseDescription"
                rows="4"
                placeholder={PLACEHOLDERS.EXPENSE_DESCRIPTION}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleTextScan}
              disabled={loading || !description.trim()}
            >
              <MdSearch size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {loading ? 'Analyzing...' : BUTTON_LABELS.ANALYZE_TEXT}
            </button>
          </div>
        )}

        {loading && <Loader message={LOADING_MESSAGES.SCANNING} />}
      </div>

      {result && (
        <div className="result-card">
          <h3>Expense Extracted and Saved</h3>
          <div className="result-item">
            <label>Vendor</label>
            <span>{result.vendor || 'N/A'}</span>
          </div>
          <div className="result-item">
            <label>Amount</label>
            <span className="amount-highlight">
              {formatCurrency(result.amount, result.currency)}
            </span>
          </div>
          <div className="result-item">
            <label>Date</label>
            <span>{formatDate(result.date)}</span>
          </div>
          <div className="result-item">
            <label>Category</label>
            <span className={getBadgeClass(result.category)}>
              {result.category || 'N/A'}
            </span>
          </div>
          <div className="result-item">
            <label>Payment Method</label>
            <span>{result.paymentMethod || 'N/A'}</span>
          </div>
          <div className="result-item">
            <label>Tax Amount</label>
            <span>{formatCurrency(result.taxAmount || 0, result.currency)}</span>
          </div>
          {result.notes && (
            <div className="result-item">
              <label>Notes</label>
              <span>{result.notes}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ScanExpense.propTypes = {};

export default ScanExpense;