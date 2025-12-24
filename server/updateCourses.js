const mongoose = require("mongoose");
const CourseModel = require("./Models/CourseModel");

const courseUpdates = [
  {
    courseName: "Vedic Astrology",
    courseDetails: "Complete Study of Birth Chart and Life Predictions"
  },
  {
    courseName: "Prashna Horary",
    courseDetails: "Accurate Question-Based Predictions Using Horary Charts"
  },
  {
    courseName: "Nakshatra Course",
    courseDetails: "In-Depth Analysis of Nakshatras and Planetary Lords"
  },
  {
    courseName: "Ashtakavarga",
    courseDetails: "Advanced System to Judge Planetary Strength and Results"
  },
  {
    courseName: "Muhurata-Advance",
    courseDetails: "Selecting Auspicious Timings for All Life Events"
  },
  {
    courseName: "Tajika Varshaphal",
    courseDetails: "Annual Horoscope Analysis for Yearly Predictions"
  },
  {
    courseName: "Medical Astrology",
    courseDetails: "Disease Diagnosis and Health Analysis Through Astrology"
  },
  {
    courseName: "Numerology",
    courseDetails: "Understanding Life Patterns Through Numbers"
  },
  {
    courseName: "Vastu Basic",
    courseDetails: "Fundamentals of Vastu for Peace and Prosperity"
  },
  {
    courseName: "Tithi Pravesha Chart",
    courseDetails: "Yearly Solar Return Chart for Event Predictions"
  }
];

const updateCourses = async () => {
  try {
    const mongoUrl = "mongodb+srv://mannu22072000:Swl2eazkWxcTCxUd@cluster0.vbzwe.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoUrl);
    console.log("✓ Connected to MongoDB");

    for (const update of courseUpdates) {
      const result = await CourseModel.findOneAndUpdate(
        { courseName: update.courseName },
        { courseDetails: update.courseDetails },
        { new: true }
      );
      if (result) {
        console.log(`✓ Updated: ${update.courseName}`);
      } else {
        console.log(`✗ Not found: ${update.courseName}`);
      }
    }

    console.log("\n✓ All courses updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating courses:", error);
    process.exit(1);
  }
};

updateCourses();
