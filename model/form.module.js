// models/Developer.js
const mongoose = require("mongoose");

const professionalExperienceSchema = new mongoose.Schema(
  {
    companyName: String,
    techStack: [String],
    skillsUsed: [String],
    timePeriod: String,
  },
  {
    versionKey: false,
  }
);

const educationExperienceSchema = new mongoose.Schema(
  {
    degreeName: String,
    schoolName: String,
    timePeriod: String,
  },
  {
    versionKey: false,
  }
);

const developerSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    professionalExperience: [professionalExperienceSchema],
    educationExperience: [educationExperienceSchema],
  },
  {
    versionKey: false,
  }
);

const DeveloperModel = mongoose.model("Developer", developerSchema);

module.exports = { DeveloperModel };
