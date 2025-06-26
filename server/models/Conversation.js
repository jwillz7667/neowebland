const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  isBot: {
    type: Boolean,
    required: true,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  messages: [messageSchema],
  lastActivity: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Update lastActivity when messages are added
conversationSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.lastActivity = new Date();
  }
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);