export default function NotificationList({ items = [] }) {
  if (!items.length) return <p className="text-soft">No notifications yet.</p>;

  return (
    <div className="notification-list">
      {items.map((item) => (
        <div key={item._id} className={`notification-item ${item.read ? '' : 'unread'}`}>
          <strong>{item.title}</strong>
          <p>{item.summary}</p>
          <small>{new Date(item.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
