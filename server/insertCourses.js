const mongoose = require("mongoose");
const CourseModel = require("./Models/CourseModel");

const courses = [
  {
    courseName: "Vedic Astrology",
    courseHeading: "Complete Study of Birth Chart and Life Predictions",
    courseDetails: "Complete Study of Birth Chart and Life Predictions",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Prashna Horary",
    courseHeading: "Accurate Question-Based Predictions Using Horary Charts",
    courseDetails: "Accurate Question-Based Predictions Using Horary Charts",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Nakshatra Course",
    courseHeading: "In-Depth Analysis of Nakshatras and Planetary Lords",
    courseDetails: "In-Depth Analysis of Nakshatras and Planetary Lords",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Ashtakavarga",
    courseHeading: "Advanced System to Judge Planetary Strength and Results",
    courseDetails: "Advanced System to Judge Planetary Strength and Results",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Muhurata-Advance",
    courseHeading: "Selecting Auspicious Timings for All Life Events",
    courseDetails: "Selecting Auspicious Timings for All Life Events",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Tajika Varshaphal",
    courseHeading: "Annual Horoscope Analysis for Yearly Predictions",
    courseDetails: "Annual Horoscope Analysis for Yearly Predictions",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Medical Astrology",
    courseHeading: "Disease Diagnosis and Health Analysis Through Astrology",
    courseDetails: "Disease Diagnosis and Health Analysis Through Astrology",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Numerology",
    courseHeading: "Understanding Life Patterns Through Numbers",
    courseDetails: "Understanding Life Patterns Through Numbers",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Vastu Basic",
    courseHeading: "Fundamentals of Vastu for Peace and Prosperity",
    courseDetails: "Fundamentals of Vastu for Peace and Prosperity",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  },
  {
    courseName: "Tithi Pravesha Chart",
    courseHeading: "Yearly Solar Return Chart for Event Predictions",
    courseDetails: "Yearly Solar Return Chart for Event Predictions",
    coursePrice: 0,
    courseDiscount: 0,
    courseFinalPrice: 0,
    courseLogo: "placeholder.png",
    courseImage: "placeholder.png",
    dropDownStatus: "True"
  }
];

const insertCourses = async () => {
  try {
    const mongoUrl = "mongodb+srv://mannu22072000:Swl2eazkWxcTCxUd@cluster0.vbzwe.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoUrl);
    console.log("✓ Connected to MongoDB\n");

    // Delete existing courses
    await CourseModel.deleteMany({});
    console.log("✓ Cleared existing courses\n");

    // Insert new courses
    const result = await CourseModel.insertMany(courses);
    console.log(`✓ Successfully inserted ${result.length} courses:\n`);

    result.forEach((course) => {
      console.log(`  ✓ ${course.courseName}`);
    });

    console.log("\n✓ All courses inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting courses:", error.message);
    process.exit(1);
  }
};

insertCourses();
