import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String
  },
  technologies: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'fullstack', 'frontend', 'backend', 'other'],
    default: 'web'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
