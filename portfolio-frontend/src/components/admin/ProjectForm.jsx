import { useState, useEffect } from 'react';
import './ProjectForm.css';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    category: 'web',
    featured: false,
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        longDescription: project.longDescription || '',
        technologies: project.technologies?.join(', ') || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        category: project.category || 'web',
        featured: project.featured || false,
        order: project.order || 0
      });
      setImagePreview(project.image ? `http://localhost:5000${project.image}` : '');
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('longDescription', formData.longDescription);
    data.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
    data.append('liveUrl', formData.liveUrl);
    data.append('githubUrl', formData.githubUrl);
    data.append('category', formData.category);
    data.append('featured', formData.featured);
    data.append('order', formData.order);
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    if (project) {
      onSubmit(project._id, data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="project-form-container">
      <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Short Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="technologies">Technologies (comma-separated) *</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="liveUrl">Live URL</label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubUrl">GitHub URL</label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Project Image *</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required={!project}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="order">Order</label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span>Featured Project</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {project ? 'Update Project' : 'Create Project'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
