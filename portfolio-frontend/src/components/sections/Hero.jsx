import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="hero">
      <motion.div 
        className="container hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-text" variants={itemVariants}>
          <motion.p className="hero-greeting">Hi, I'm</motion.p>
          <motion.h1 className="hero-name">
            Isack <span className="text-accent">Kibet</span>
          </motion.h1>
          <motion.h2 className="hero-title">
            Self-Taught Full-Stack Developer
          </motion.h2>
          <motion.p className="hero-description">
            Building beautiful, functional web applications with modern technologies.
            Passionate about clean code, user experience, and continuous learning.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          variants={itemVariants}
        >
          <div className="profile-photo-container">
            <div className="profile-photo">
              <img 
                src="/profile.jpg" 
                alt="Isack Kibet" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="profile-placeholder">IK</div>';
                }}
              />
            </div>
            <div className="profile-glow"></div>
          </div>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
