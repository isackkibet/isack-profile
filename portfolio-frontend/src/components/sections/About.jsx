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
            <p>
              A creative full-stack developer with 3 years of experience adept at working both remotely and in-office.
            </p>
            <p>
              Since the beginning of my journey as a software developer, I've done remote work for agencies, 
              developed for startups, and collaborated with talents to create digital products for both business 
              and consumer use.
            </p>
            <p>
              <span className="text-orange">~ What I do</span>
            </p>
            <p>
              <span className="text-orange">Websites & Webapps</span>
            </p>
            <p>
              I develop back-end & front-end applications with React, Vue, Angular, Django, Node & GO
            </p>
            <p>
              <span className="text-orange">Mobile Applications</span>
            </p>
            <p>
              I do iOS and android app development with Flutter and React Native/Expo
            </p>
            <p>
              <span className="text-orange">Tools & technologies</span>
            </p>
          </div>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-number">3</div>
              <div className="highlight-label">Years Experience</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">10</div>
              <div className="highlight-label">Projects Completed</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">Web & Mobile</div>
              <div className="highlight-label">Full-Stack Dev</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
tin