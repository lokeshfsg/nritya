import { NavLink } from 'react-router-dom';

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <h4>Nritya Nova</h4>
      <nav>
        <NavLink to="/admin">Overview</NavLink>
        <NavLink to="/admin/applications">Applications</NavLink>
        <NavLink to="/admin/messages">Messages</NavLink>
        <NavLink to="/admin/notifications">Notifications</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}
