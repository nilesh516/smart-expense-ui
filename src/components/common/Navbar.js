import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdSearch,
  MdList,
  MdDashboard,
  MdTrackChanges,
  MdLogout,
  MdPerson
} from 'react-icons/md';
import { APP, ROUTES } from '../../constants/appConstants';
import { useAuthContext } from '../../context/AuthContext';

const NAV_LINKS = [
  { path: ROUTES.HOME, label: 'Scan', Icon: MdSearch },
  { path: ROUTES.EXPENSES, label: 'Expenses', Icon: MdList },
  { path: ROUTES.DASHBOARD, label: 'Dashboard', Icon: MdDashboard },
  { path: ROUTES.BUDGET, label: 'Budget', Icon: MdTrackChanges }
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

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

      {/* User info and logout */}
      <div className="navbar-user">
        <span className="navbar-username">
          <MdPerson size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          {user?.name}
        </span>
        <button
          className="btn-logout"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <MdLogout size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;