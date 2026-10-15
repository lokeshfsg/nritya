export default function PricingCard({ title, price, details, label }) {
  return (
    <div className="card premium-card text-center h-100">
      <div className="card-body">
        <p className="eyebrow">{label}</p>
        <h3>{title}</h3>
        <div className="price-tag">₹{price}</div>
        <p>{details}</p>
        <a href="/admission" className="btn btn-primary">Apply Now</a>
      </div>
    </div>
  );
}
