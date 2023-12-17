const express = require("express");
require("dotenv").config();

const { DeveloperModel } = require("../model/form.module");
const DeveloperRouter = express.Router();

DeveloperRouter.get("/", async (req, res) => {
  try {
    const developers = await DeveloperModel.find();
    res
      .status(200)
      .send({ message: "Developer list retrieved successfully", developers });
  } catch (err) {
    res.status(500).send({
      message: "Error in your API request",
      error: err,
    });
  }
});

DeveloperRouter.post("/add", async (req, res) => {
  try {
    //   const ques = new CategoryModel(req.body);
    const formData = req.body;

    // Create a new instance of the DeveloperModel
    const newDeveloper = new DeveloperModel({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email, // Add email field to your form
      professionalExperience: formData.professionalExperiences.map((exp) => ({
        companyName: exp.companyName,
        techStack: exp.techStack,
        skillsUsed: exp.skillsUsed,
        timePeriod: exp.timePeriod,
      })),
      educationExperience: formData.educationExperiences.map((edu) => ({
        degreeName: edu.degreeName,
        schoolName: edu.schoolName,
        timePeriod: edu.timePeriod,
      })),
    });

    // Save the new developer to the database
    await newDeveloper.save();

    res.status(200).json({
      message: "Developer onboarding details submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = DeveloperRouter;
