const mongoose = require("mongoose");

const academicQualificationSchema = new mongoose.Schema({
  class: { type: String, required: true },
  board: { type: String, required: true },
  percentage: { type: String, required: true },
  pcm: { type: String, required: true }, // PCM/PCB/Science
  division: { type: String, required: true }
}, { _id: false });

const mentorMenteeSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  correspondenceAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  studentMobile: { type: String, required: true },
  parentMobile: { type: String, required: true },
  studentEmail: { type: String, required: true },
  occupation: { type: String, required: true },
  localGuardian: { type: String, required: false }, // Optional field
  parentName: { type: String, required: true },
  parentAddress: { type: String, required: true },
  class: { type: String, required: true },
  branch: { type: String, required: true },
  academicQualifications: [academicQualificationSchema],
  extracurricularActivities: { 
    type: [String], 
    default: ["", "", ""]
  },
  category: { 
    type: String, 
    enum: ["GEN", "OBC", "SC", "ST", "Other"], 
    default: "GEN" 
  },
  achievement: { type: String, required: false } // Optional field
}, { timestamps: true });

const MentorMentee = mongoose.model("MentorMentee", mentorMenteeSchema);

module.exports = MentorMentee;


