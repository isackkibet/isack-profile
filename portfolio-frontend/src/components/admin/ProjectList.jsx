import './ProjectList.css';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return <div className="no-projects">No projects yet. Create your first one!</div>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project._id} className="project-item">
          <div className="project-item-image">
            <img 
              src={`http://localhost:5000${project.image}`} 
              alt={project.title} 
            />
            {project.featured && <span className="featured-badge">Featured</span>}
          </div>
          
          <div className="project-item-content">
            <div className="project-item-header">
              <h3>{project.title}</h3>
              <span className="category-badge">{project.category}</span>
            </div>
            
            <p className="project-item-description">{project.description}</p>
            
            <div className="project-item-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-item-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
          
          <div className="project-item-actions">
            <button 
              onClick={() => onEdit(project)} 
              className="btn-action btn-edit"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(project._id)} 
              className="btn-action btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
