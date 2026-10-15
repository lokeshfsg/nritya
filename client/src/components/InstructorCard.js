export default function InstructorCard({ name, title, description }) {
  return (
    <div className="card premium-card text-center h-100">
      <div className="card-body">
        <div className="avatar-circle">{name.charAt(0)}</div>
        <h5>{name}</h5>
        <p className="text-gold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
