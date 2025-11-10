import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>
          Designed and Developed by <span className="text-accent">Isack Kibet</span>
        </p>
        <p className="footer-tech">
          Built with React and MUI | Hosted on Netlify | Icons by Iconify
        </p>
      </div>
    </footer>
  );
};

export default Footer;
