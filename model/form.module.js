// models/Developer.js
const mongoose = require("mongoose");

const professionalExperienceSchema = new mongoose.Schema({
  companyName: String,
  techStack: String,
  //   skillsUsed: [String], // References to skills
  timePeriod: String,
});

const educationExperienceSchema = new mongoose.Schema({
  degreeName: String,
  schoolName: String,
  timePeriod: String,
});

const developerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  skills: [String], // References to skills
  professionalExperience: [professionalExperienceSchema],
  educationExperience: [educationExperienceSchema],
});

const DeveloperModel = mongoose.model("Developer", developerSchema);

module.exports = { DeveloperModel };
