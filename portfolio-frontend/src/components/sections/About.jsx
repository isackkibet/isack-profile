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
              I am a Fullstack software developer with 2+ years experience in both Web and Native App development. 
              My secondary skill is UI/UX Designer.
            </p>
            <p>
              I strive to build awesome web and mobile applications, with great functionality through carefully 
              crafted code and user-centric design. I am focused on dependable development, safety-critical 
              development, real-time data sync in development, and high-performance development.
            </p>
            <p>
              Through continuous learning and hands-on experience, I've developed a strong foundation in modern 
              technologies and best practices. I believe in creating solutions that not only work well but also 
              provide exceptional user experiences.
            </p>
          </div>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-number">2+</div>
              <div className="highlight-label">Years Experience</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">10+</div>
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
