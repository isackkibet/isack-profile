import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>My Journey</h3>
            <p>
              I'm a self-taught full-stack developer with a passion for creating elegant 
              solutions to complex problems. My journey into programming started with curiosity 
              and has evolved into a deep commitment to building meaningful digital experiences.
            </p>
            <p>
              Through countless hours of learning, building projects, and overcoming challenges, 
              I've developed a strong foundation in modern web technologies. I believe in 
              continuous learning and staying up-to-date with the latest industry trends.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-number">3+</div>
              <div className="highlight-label">Years Learning</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">20+</div>
              <div className="highlight-label">Projects Built</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">100%</div>
              <div className="highlight-label">Self-Taught</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
