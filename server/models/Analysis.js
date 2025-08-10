// server/models/Analysis.js
const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  resumeText: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
