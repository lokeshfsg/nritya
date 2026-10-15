import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import DanceStyleCard from '../components/DanceStyleCard';
import GalleryVideoGrid from '../components/GalleryVideoGrid';
import api from '../services/api';
import { danceStyles, workshopHighlights } from '../data/siteContent';

export default function HomePage() {
  const [styles, setStyles] = useState(danceStyles);

  useEffect(() => {
    api.get('/dance-styles')
      .then((res) => {
        const apiStyles = res.data.data || [];
        const merged = [...danceStyles, ...apiStyles.filter((style) => !danceStyles.some((item) => item.name === style.name || item.slug === style.slug))];
        setStyles(merged.slice(0, 5));
      })
      .catch(() => setStyles(danceStyles));
  }, []);

  return (
    <>
      <HeroSection />

      <section className="section-space">
        <div className="container">
          <div className="text-center mb-5 page-intro">
            <p className="eyebrow">Welcome to Nritya Nova</p>
            <h2>Move with passion. Shine with confidence.</h2>
            <p>From expressive folk forms to modern choreography, our studio brings together technique, confidence, and joyful performance for every age and stage.</p>
          </div>

          <div className="row g-4 feature-grid">
            <div className="col-md-4"><div className="card premium-card p-4 h-100"><h4>Premium Coaching</h4><p>Personal guidance, structured progression, and a warm studio culture designed for real progress.</p></div></div>
            <div className="col-md-4"><div className="card premium-card p-4 h-100"><h4>Beginner Friendly</h4><p>Supportive sessions for children, adults, beginners, and returning dancers who want to grow with purpose.</p></div></div>
            <div className="col-md-4"><div className="card premium-card p-4 h-100"><h4>Confidence & Fitness</h4><p>Build posture, rhythm, fitness, coordination, and stage presence through joyful movement.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section-space alt-bg">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Explore Our Dance Styles</p>
            <h2>Find your signature movement</h2>
          </div>
          <div className="row g-4">
            {styles.map((style) => (
              <div className="col-md-6 col-lg-4" key={style._id || style.slug || style.name}><DanceStyleCard style={style} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="section-heading text-center">
            <p className="eyebrow">Class Timings</p>
            <h2>Kids and adult batches</h2>
          </div>

          <div className="row g-4 timing-grid">
            <div className="col-md-6">
              <div className="card premium-card timing-card">
                <span className="chip">Kids Batch</span>
                <h3>5:00 PM – 6:00 PM</h3>
                <p>Creative movement for children, confidence-building routines, and engaging group sessions.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card premium-card timing-card">
                <span className="chip">Adult Batch</span>
                <h3>8:00 PM – 9:00 PM</h3>
                <p>Styled routines for expressive dance, fitness, technique, and performance practice.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/class-timings" className="btn btn-secondary">View Full Schedule</Link>
          </div>
        </div>
      </section>

      <section className="section-space alt-bg">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured Belly Dance</p>
            <h2>Saturday & Sunday spotlight sessions</h2>
          </div>
          <div className="feature-banner">
            <div className="feature-banner-content">
              <span className="chip accent">Weekend Special</span>
              <h3>Elegant rhythm, posture, and expressive movement</h3>
              <p>Belly Dance weekend batches create a focused environment for technique, confidence, and graceful expression across both weekend sessions.</p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/dance/belly-dance" className="btn btn-primary">Explore Belly Dance</Link>
                <Link to="/weekend-workshops" className="btn btn-secondary">See Weekend Workshops</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Weekend Workshops</p>
            <h2>Fresh sessions designed for skill growth</h2>
          </div>
          <div className="row g-4">
            {workshopHighlights.map((workshop) => (
              <div className="col-md-6 col-lg-4" key={workshop.slug}>
                <div className="card premium-card workshop-card h-100">
                  <img src={workshop.image} alt={workshop.title} className="card-image" />
                  <div className="card-body">
                    <div className="workshop-meta"><span>{workshop.day}</span><span>{workshop.level}</span></div>
                    <h4>{workshop.title}</h4>
                    <p>{workshop.summary}</p>
                    <div className="meta-row">
                      <span>{workshop.time}</span>
                      <span>{workshop.fee}</span>
                    </div>
                    <Link to={`/workshops/${workshop.slug}`} className="btn btn-primary mt-3">Book Workshop</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space alt-bg">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Learn in a vibrant, confidence-first environment</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-3"><div className="card premium-card p-4 h-100"><h4>Creative Learning</h4><p>Explore movement, rhythm, and musicality through structured guidance and joyful practice.</p></div></div>
            <div className="col-md-3"><div className="card premium-card p-4 h-100"><h4>Age-Adapted Classes</h4><p>Young learners and adults each receive sessions that balance energy, technique, and comfort.</p></div></div>
            <div className="col-md-3"><div className="card premium-card p-4 h-100"><h4>Performance Ready</h4><p>Build festival, rehearsal, and stage confidence with choreography that feels expressive and personal.</p></div></div>
            <div className="col-md-3"><div className="card premium-card p-4 h-100"><h4>Community Energy</h4><p>Join a supportive atmosphere where every student feels motivated, seen, and inspired.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Dance Gallery</p>
            <h2>Moments from the studio</h2>
          </div>
          <GalleryVideoGrid />
        </div>
      </section>

      <section className="section-space alt-bg">
        <div className="container">
          <div className="text-center mb-4">
            <p className="eyebrow">Student Stories</p>
            <h2>Sample testimonials</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4"><div className="card premium-card p-4 h-100 testimonial-card"><p>“The sessions feel exciting, uplifting, and beautifully structured. I’ve gained more confidence in just a few weeks.”</p><strong>— Student</strong></div></div>
            <div className="col-md-4"><div className="card premium-card p-4 h-100 testimonial-card"><p>“The studio environment is energetic and encouraging. It’s a beautiful place to learn expressive dance and discipline.”</p><strong>— Parent</strong></div></div>
            <div className="col-md-4"><div className="card premium-card p-4 h-100 testimonial-card"><p>“I loved the mix of technique, rhythm, and performance energy. It made me feel confident on and off the stage.”</p><strong>— Adult Learner</strong></div></div>
          </div>
        </div>
      </section>

      <section className="section-space cta-section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <p className="eyebrow">Join Our Classes</p>
              <h2>Ready to begin your dance story?</h2>
            </div>
            <div className="cta-actions">
              <Link to="/admission" className="btn btn-primary">Join a Class</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space alt-bg">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="location-card">
                <p className="eyebrow">Location</p>
                <h2>Visit the studio in Keshav Nagar</h2>
                <p>Keshav Nagar, near Kharadi, near the New Bridge, Pune, Maharashtra, India.</p>
                <div className="location-actions">
                  <Link to="/location" className="btn btn-primary">Find Us</Link>
                  <a href="https://www.google.com/maps/search/?api=1&query=Keshav+Nagar+near+Kharadi+Pune" target="_blank" rel="noreferrer" className="btn btn-secondary">Get Directions</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="map-card">
                <iframe
                  title="Nritya Nova Location Map"
                  src="https://www.google.com/maps?q=Keshav%20Nagar%20near%20Kharadi%20Pune&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="row g-4 align-items-center contact-strip">
            <div className="col-md-6">
              <p className="eyebrow">Contact Details</p>
              <h2>Let’s create your next move.</h2>
              <p className="text-soft">Phone: [ADD ACADEMY PHONE NUMBER]<br />WhatsApp: [ADD WHATSAPP NUMBER]<br />Email: [ADD ACADEMY EMAIL]</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
