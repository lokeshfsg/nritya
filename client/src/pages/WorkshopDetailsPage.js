import { Link, useParams } from 'react-router-dom';
import { getWorkshopBySlug } from '../data/siteContent';

export default function WorkshopDetailsPage() {
  const { slug } = useParams();
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    return (
      <div className="container section-space">
        <div className="card premium-card p-5 text-center">
          <h2>Workshop not found.</h2>
          <Link to="/weekend-workshops" className="btn btn-primary mt-3">Back to workshops</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-space">
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(14,10,26,0.45), rgba(14,10,26,0.75)), url(${workshop.image})` }}>
        <div>
          <p className="eyebrow">Weekend Workshop</p>
          <h1>{workshop.title}</h1>
          <p>{workshop.summary}</p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/admission" className="btn btn-primary">Book Now</Link>
            <Link to="/weekend-workshops" className="btn btn-secondary">View All Workshops</Link>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-lg-8">
          <div className="card premium-card p-4">
            <h3>Workshop information</h3>
            <ul className="feature-list">
              <li><strong>Dance Style:</strong> {workshop.style}</li>
              <li><strong>Day:</strong> {workshop.day}</li>
              <li><strong>Time:</strong> {workshop.time}</li>
              <li><strong>Level:</strong> {workshop.level}</li>
              <li><strong>Fee:</strong> {workshop.fee}</li>
              <li><strong>Seats Left:</strong> {workshop.seatsLeft}</li>
              <li><strong>Status:</strong> {workshop.status}</li>
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card premium-card p-4">
            <h3>Quick details</h3>
            <p className="mb-0">This workshop is intended for dancers who want focused practice in a weekend-friendly learning slot. Capacity and availability are confirmed by the academy after registration.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
