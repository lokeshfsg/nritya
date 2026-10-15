import PricingCard from '../components/PricingCard';

export default function ClassesPage() {
  return (
    <div className="container section-space">
      <div className="section-heading">
        <p className="eyebrow">Classes & Fees</p>
        <h1>Flexible learning, transparent pricing</h1>
      </div>
      <div className="row g-4">
        <div className="col-md-6"><PricingCard title="Children" price="1,200" label="Per Person" details="Suggested age eligibility: 4–17 years. Final schedule and pricing confirmed by the studio." /></div>
        <div className="col-md-6"><PricingCard title="Adults" price="1,500" label="Starting From" details="Adults begin from ₹1,500 per person. Final pricing may vary by style, package or timetable." /></div>
      </div>
      <div className="card premium-card p-4 mt-4">
        <p className="text-soft mb-0">Contact the studio for class timings and final fees. All schedules and fees are subject to confirmation by the studio.</p>
      </div>
    </div>
  );
}
