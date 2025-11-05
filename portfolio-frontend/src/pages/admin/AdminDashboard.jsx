import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getContactMessages,
  deleteContactMessage
} from '../../services/portfolioService';
import ProjectForm from '../../components/admin/ProjectForm';
import ProjectList from '../../components/admin/ProjectList';
import ContactMessages from '../../components/admin/ContactMessages';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await getContactMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData);
      fetchProjects();
      setShowForm(false);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  const handleUpdateProject = async (id, formData) => {
    try {
      await updateProject(id, formData);
      fetchProjects();
      setEditingProject(null);
      setShowForm(false);
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {admin?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
        </div>

        <div className="dashboard-body">
          {activeTab === 'projects' && (
            <div className="projects-section">
              <div className="section-header">
                <h2>Manage Projects</h2>
                {!showForm && (
                  <button 
                    onClick={() => setShowForm(true)} 
                    className="btn btn-primary"
                  >
                    + Add New Project
                  </button>
                )}
              </div>

              {showForm && (
                <ProjectForm
                  project={editingProject}
                  onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                  onCancel={handleCancelEdit}
                />
              )}

              {loading ? (
                <div className="loading">Loading projects...</div>
              ) : (
                <ProjectList
                  projects={projects}
                  onEdit={handleEdit}
                  onDelete={handleDeleteProject}
                />
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-section">
              <div className="section-header">
                <h2>Contact Messages</h2>
              </div>

              {loading ? (
                <div className="loading">Loading messages...</div>
              ) : (
                <ContactMessages
                  messages={messages}
                  onDelete={handleDeleteMessage}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
