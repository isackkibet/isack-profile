import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT', 'bcrypt']
    },
    {
      title: 'Tools & Others',
      skills: ['Git', 'VS Code', 'Vite', 'npm', 'Postman', 'Chrome DevTools']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Tools</h2>
        
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="skill-category"
              variants={itemVariants}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    className="skill-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
