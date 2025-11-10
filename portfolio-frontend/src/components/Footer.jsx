import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>© {currentYear} Designed by <span className="text-accent">Isack Kibet</span></p>
      </div>
    </footer>
  );
};

export default Footer;
