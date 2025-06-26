const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Design', 'Mobile App', 'E-commerce', 'Branding']
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  liveUrl: {
    type: String,
    default: '#'
  },
  githubUrl: {
    type: String,
    default: '#'
  },
  client: {
    name: String,
    role: String,
    feedback: String,
    avatar: String
  },
  features: [{
    type: String
  }],
  duration: {
    type: String,
    default: '3 months'
  },
  teamSize: {
    type: String,
    default: '4 members'
  },
  rating: {
    type: String,
    default: '5.0/5.0'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'draft'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);