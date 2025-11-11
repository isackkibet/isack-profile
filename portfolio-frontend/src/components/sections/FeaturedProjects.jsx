import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '../../services/portfolioService';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getFeaturedProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section id="projects" className="featured-projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="featured-projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {projects.length === 0 ? (
            <p className="no-projects">No featured projects yet. Check back soon!</p>
          ) : (
            projects.map((project) => (
              <motion.div 
                key={project._id}
                className="project-card"
                variants={itemVariants}
                whileHover={{ y: -10, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="project-image">
                  <img 
                    src={`http://localhost:5000${project.image}`} 
                    alt={project.title} 
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="view-all-container">
          <a href="/projects" className="btn btn-primary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
