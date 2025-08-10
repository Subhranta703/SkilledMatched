// server/models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
  {
    resumeText: String,
    result: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', ResumeSchema);
