import express from 'express';
import Project from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured projects (public)
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create project (protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      technologies: JSON.parse(req.body.technologies || '[]'),
      image: req.file ? `/uploads/${req.file.filename}` : ''
    };

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update project (protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // If new image uploaded, delete old one
    if (req.file && project.image) {
      const oldImagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updateData = {
      ...req.body,
      technologies: req.body.technologies ? JSON.parse(req.body.technologies) : project.technologies,
      image: req.file ? `/uploads/${req.file.filename}` : project.image
    };

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete project (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete associated image
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
