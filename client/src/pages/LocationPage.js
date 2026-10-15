import { Link } from 'react-router-dom';

export default function LocationPage() {
  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Location</p>
        <h1>Find the studio in Keshav Nagar, Pune</h1>
        <p>We are located near Kharadi and the New Bridge in Pune, Maharashtra, India. The pin can be updated by the admin when the exact studio address becomes available.</p>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-lg-5">
          <div className="card premium-card p-4 location-panel h-100">
            <h3>Academy address</h3>
            <p>Keshav Nagar, near Kharadi, near the New Bridge, Pune, Maharashtra, India.</p>
            <p className="text-soft">This studio location is currently represented as an approximate neighbourhood pin until the exact address is confirmed and updated.</p>
            <div className="d-flex flex-wrap gap-3">
              <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=Keshav+Nagar+near+Kharadi+Pune" target="_blank" rel="noreferrer">Get Directions</a>
              <Link className="btn btn-secondary" to="/contact">Contact the Studio</Link>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="map-card large-map">
            <iframe
              title="Nritya Nova Map"
              src="https://www.google.com/maps?q=Keshav%20Nagar%20near%20Kharadi%20Pune&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
