import api from './api';

// Projects
export const getProjects = () => api.get('/projects');
export const getFeaturedProjects = () => api.get('/projects/featured');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (formData) => 
  api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const updateProject = (id, formData) => 
  api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Contact
export const sendContactMessage = (data) => api.post('/contact', data);
export const getContactMessages = () => api.get('/contact');
export const markMessageAsRead = (id) => api.patch(`/contact/${id}/read`);
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);
