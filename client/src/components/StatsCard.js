export default function StatsCard({ title, value, tone = 'primary' }) {
  return (
    <div className="card premium-card stats-card">
      <div className="card-body">
        <p>{title}</p>
        <h3 className={tone}>{value}</h3>
      </div>
    </div>
  );
}
