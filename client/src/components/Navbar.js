import { Link, NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/dance-styles', label: 'Dance Styles' },
  { to: '/class-timings', label: 'Class Timings' },
  { to: '/weekend-workshops', label: 'Weekend Workshops' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/location', label: 'Location' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  return (
    <nav className="site-navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand-mark" aria-label="Nritya Nova home">
          <img src="/nritya-logo.jpeg" alt="" className="brand-logo" />
          <span>NRITYA NOVA</span>
        </Link>

        <button className="menu-toggle" type="button" aria-label="Toggle navigation">
          <FaBars />
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <NavLink to="/admission" className="btn btn-primary nav-cta">Join Now</NavLink>
        </div>
      </div>
    </nav>
  );
}
