import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdSearch,
  MdList,
  MdDashboard,
  MdTrackChanges
} from 'react-icons/md';
import { APP, ROUTES } from '../../constants/appConstants';

const NAV_LINKS = [
  { path: ROUTES.HOME, label: 'Scan', Icon: MdSearch },
  { path: ROUTES.EXPENSES, label: 'Expenses', Icon: MdList },
  { path: ROUTES.DASHBOARD, label: 'Dashboard', Icon: MdDashboard },
  { path: ROUTES.BUDGET, label: 'Budget', Icon: MdTrackChanges }
];

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to={ROUTES.HOME} className="navbar-brand">
        {APP.NAME}
      </Link>
      <div className="navbar-links">
        {NAV_LINKS.map(({ path, label, Icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${isActive(path) ? 'active' : ''}`}
          >
            <Icon size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;