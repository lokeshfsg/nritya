import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h4 className="brand-mark">NRITYA NOVA</h4>
            <p className="text-soft">Discover your rhythm and express your story through confident, joyful movement.</p>
          </div>
          <div className="col-md-4">
            <h5>Explore</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/dance-styles">Dance Styles</Link></li>
              <li><Link to="/class-timings">Class Timings</Link></li>
              <li><Link to="/weekend-workshops">Weekend Workshops</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect</h5>
            <ul className="footer-links">
              <li><Link to="/location">Location</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admission">Join Now</Link></li>
              <li><Link to="/admin/login">Admin</Link></li>
              <li>
                <a href="https://www.instagram.com/nirtya_nova_19/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram aria-hidden="true" /> Nritya Nova Instagram
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/jalpagajjar19/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram aria-hidden="true" /> Jalpa's Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nritya Nova</span>
          <span>Keshav Nagar, near Kharadi, New Bridge, Pune, Maharashtra, India</span>
        </div>
      </div>
    </footer>
  );
}
