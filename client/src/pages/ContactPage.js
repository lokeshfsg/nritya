import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container section-space">
      <div className="section-heading page-intro">
        <p className="eyebrow">Contact Us</p>
        <h1>Connect with Nritya Nova</h1>
        <p>Reach out for class availability, workshop updates, or admission guidance. We’ll help you choose the right dance style and schedule for your journey.</p>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-lg-5">
          <div className="card premium-card p-4 h-100 location-panel">
            <h3>Academy contact</h3>
            <ul className="feature-list compact-list">
              <li><strong>Phone:</strong> [ADD ACADEMY PHONE NUMBER]</li>
              <li><strong>WhatsApp:</strong> [ADD WHATSAPP NUMBER]</li>
              <li><strong>Email:</strong> [ADD ACADEMY EMAIL]</li>
              <li><strong>Address:</strong> Keshav Nagar, near Kharadi, near the New Bridge, Pune, Maharashtra, India.</li>
            </ul>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="btn btn-primary mt-3">Chat on WhatsApp</a>
          </div>
        </div>
        <div className="col-lg-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
