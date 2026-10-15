import { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCard from '../components/StatsCard';
import ApplicationTable from '../components/ApplicationTable';
import MessageTable from '../components/MessageTable';
import NotificationList from '../components/NotificationList';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  async function fetchData() {
    try {
      const [statsRes, appsRes, msgRes, notesRes] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/applications'),
        api.get('/admin/messages'),
        api.get('/admin/notifications')
      ]);

      setStats(statsRes.data.data);
      setApplications(appsRes.data.data || []);
      setMessages(msgRes.data.data || []);
      setNotifications(notesRes.data.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totals = stats?.totals || {};

  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <div className="dashboard-main">
        <DashboardHeader count={notifications.filter((n) => !n.read).length} />

        <div className="container-fluid p-4">
          <div className="row g-3 mb-4">
            <div className="col-md-4"><StatsCard title="Total Applications" value={totals.totalApplications || 0} /></div>
            <div className="col-md-4"><StatsCard title="New Applications" value={totals.newApplications || 0} /></div>
            <div className="col-md-4"><StatsCard title="Unread Messages" value={totals.unreadMessages || 0} /></div>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card premium-card p-3">
                <h4>Recent Applications</h4>
                <ApplicationTable items={applications.slice(0, 5)} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card premium-card p-3">
                <h4>Notifications</h4>
                <NotificationList items={notifications.slice(0, 5)} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="card premium-card p-3">
              <h4>Incoming Messages</h4>
              <MessageTable items={messages.slice(0, 5)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
