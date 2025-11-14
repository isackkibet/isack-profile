import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const downloadResume = () => {
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This should point to your actual resume file
    link.download = 'Isack_Kibet_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute && location.pathname !== '/admin/login') {
    return null; // Don't show navbar in admin dashboard
  }

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-content">
        <div className="nav-links">
          <Link to="/" className="logo-link">
            <span className="logo-text">Isack Kibet</span>
          </Link>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </Link>
          <button onClick={() => scrollToSection('about')} className="nav-link-btn">
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link-btn">
            Contact
          </button>
          <button onClick={downloadResume} className="nav-link-btn download-btn" title="Download my resume">
            📄 Download Resume
          </button>
          {isAuthenticated && (
            <>
              <Link to="/admin/dashboard" className="admin-link">Dashboard</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
