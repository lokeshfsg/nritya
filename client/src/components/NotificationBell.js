import { FaBell } from 'react-icons/fa';

export default function NotificationBell({ count = 0 }) {
  return (
    <div className="notification-bell">
      <FaBell />
      {count > 0 && <span className="badge-count">{count}</span>}
    </div>
  );
}
