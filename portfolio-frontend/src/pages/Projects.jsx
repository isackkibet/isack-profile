import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/portfolioService';
import Footer from '../components/Footer';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            All <span className="text-orange">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my complete portfolio of work
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <motion.div 
            className="projects-grid"
            layout
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
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
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="no-projects">
            No projects found in this category.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
