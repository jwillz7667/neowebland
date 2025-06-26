const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  icon: {
    type: String,
    required: true,
    default: 'Code'
  },
  price: {
    type: Number,
    min: 0
  },
  duration: {
    type: String,
    default: '2-4 weeks'
  },
  category: {
    type: String,
    enum: ['Development', 'Design', 'Mobile', 'E-commerce', 'Optimization', 'Consulting'],
    default: 'Development'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);