const mongoose = require('mongoose');

const MentorMenteeSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  correspondenceAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  studentMobile: { type: String, required: true },
  parentMobile: { type: String, required: true },
  studentEmail: { type: String, required: true },
  parentEmail: { type: String, required: true },
  occupation: { type: String, required: true },
  academicQualifications: {
    tenth: {
      board: { type: String, required: true },
      percentage: { type: Number, required: true },
      pcm: { type: Number },
      division: { type: String }
    },
    twelfth: {
      board: { type: String, required: true },
      percentage: { type: Number, required: true },
      pcm: { type: Number },
      division: { type: String }
    },
    other: {
      board: { type: String },
      percentage: { type: Number },
      pcm: { type: Number },
      division: { type: String }
    }
  },
  extracurricularActivities: [String],
  category: { type: String, required: true },
  guardianName: { type: String },
  contactNo: { type: String },
  achievement: { type: String }
});

module.exports = mongoose.model('MentorMentee', MentorMenteeSchema);
