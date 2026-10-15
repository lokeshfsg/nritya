export default function MessageTable({ items = [] }) {
  if (!items.length) return <p className="text-soft">No messages yet.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.fullName}</td>
              <td>{item.subject}</td>
              <td>{item.email}</td>
              <td>{item.read ? 'Read' : 'Unread'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
