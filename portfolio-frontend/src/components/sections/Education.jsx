import { motion } from 'framer-motion';
import './Education.css';

const Education = () => {
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
    <section className="education" id="education">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        
        <motion.div 
          className="education-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="education-item" variants={itemVariants}>
            <div className="education-header">
              <h3>Technical University of Kenya</h3>
              <div className="education-date">2019 - 2023</div>
            </div>
            <p className="education-degree">Bachelor of Science in Software Engineering</p>
            <p className="education-description">
              Comprehensive program covering software development, algorithms, 
              database systems, and project management. Graduated with honors.
            </p>
          </motion.div>
          
          <motion.div className="education-item" variants={itemVariants}>
            <div className="education-header">
              <h3>Moringa School</h3>
              <div className="education-date">2023 - 2024</div>
            </div>
            <p className="education-degree">Full-Stack Development Bootcamp</p>
            <p className="education-description">
              Intensive program focused on modern web technologies including 
              React, Node.js, and cloud deployment. Completed with distinction.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
