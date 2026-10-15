import { Link } from 'react-router-dom';
import { workshopHighlights } from '../data/siteContent';

export default function WeekendWorkshopsPage() {
  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Weekend Workshops</p>
        <h1>Creative weekend sessions for dancers of every level</h1>
        <p>These workshop sessions are designed around rhythm, technique, and confidence, with space for both beginners and intermediate learners.</p>
      </div>

      <div className="row g-4">
        {workshopHighlights.map((workshop) => (
          <div className="col-lg-4 col-md-6" key={workshop.slug}>
            <div className="card premium-card workshop-card h-100">
              <img src={workshop.image} alt={workshop.title} className="card-image" />
              <div className="card-body">
                <div className="workshop-meta">
                  <span>{workshop.day}</span>
                  <span>{workshop.level}</span>
                </div>
                <h3>{workshop.title}</h3>
                <p>{workshop.summary}</p>
                <ul className="feature-list compact-list">
                  <li><strong>Dance Style:</strong> {workshop.style}</li>
                  <li><strong>Time:</strong> {workshop.time}</li>
                  <li><strong>Fee:</strong> {workshop.fee}</li>
                  <li><strong>Seats Left:</strong> {workshop.seatsLeft}</li>
                </ul>
                <Link to={`/workshops/${workshop.slug}`} className="btn btn-primary mt-3">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
