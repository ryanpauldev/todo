const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'incomplete',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  order: {  // Add order field
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Task', TaskSchema);

