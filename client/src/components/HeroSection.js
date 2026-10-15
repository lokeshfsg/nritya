import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="container hero-content position-relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Premium Dance Studio</p>
          <h1>Find Your Rhythm. Unleash Your Stardom.</h1>
          <p>
            Discover your passion, express your story, and move with confidence at Nritya Nova.
          </p>
          <div className="hero-actions">
            <Link to="/admission" className="btn btn-primary">Apply for Admission</Link>
            <Link to="/dance-styles" className="btn btn-secondary">Explore Dance Styles</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
