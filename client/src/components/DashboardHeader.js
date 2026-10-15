import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function DashboardHeader({ count = 0 }) {
  const { admin, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div>
        <h3>Dashboard</h3>
      </div>
      <div className="header-actions">
        <NotificationBell count={count} />
        <div className="admin-profile">{admin?.fullName || 'Admin'}</div>
        <button onClick={logout} className="btn btn-outline-light btn-sm">Logout</button>
      </div>
    </header>
  );
}
