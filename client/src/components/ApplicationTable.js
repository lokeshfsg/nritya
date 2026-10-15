export default function ApplicationTable({ items = [] }) {
  if (!items.length) return <p className="text-soft">No applications yet.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Dance Style</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id || item.applicationReference}>
              <td>{item.applicationReference}</td>
              <td>{item.fullName}</td>
              <td>{item.phoneNumber || '—'}</td>
              <td>{item.preferredDanceStyle}</td>
              <td>{item.status}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
