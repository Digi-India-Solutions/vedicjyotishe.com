const mongoose = require("mongoose");
require("dotenv").config();
const Course = require("./Models/CourseModel");

const coursesData = [
  {
    courseName: "Vedic Astrology",
    courseHeading: "Basic to Advanced",
    courseDetails: "This program builds strong conceptual clarity with practical application for accurate and confident readings.",
    coursePrice: 5000,
    courseFinalPrice: 3999,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-1.jpg",
    courseImage: "Public/course-image-1.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Numerology",
    courseHeading: "Basic to Advanced",
    courseDetails: "The course offer's basics to practical application, understanding the meaning and vibration of numbers in life.",
    coursePrice: 3800,
    courseFinalPrice: 2899,
    courseDiscount: 901,
    courseLogo: "Public/course-logo-2.jpg",
    courseImage: "Public/course-image-2.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Nakshatra",
    courseHeading: "The Advance course",
    courseDetails: "It focuses on advanced interpretation, predictive use, remedies, and practical chart application.",
    coursePrice: 4000,
    courseFinalPrice: 2999,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-3.jpg",
    courseImage: "Public/course-image-3.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Ashtakavarga",
    courseHeading: "The Advance Course",
    courseDetails: "It covers real-life applications for accurate predictions and timing of events.",
    coursePrice: 5500,
    courseFinalPrice: 4299,
    courseDiscount: 1201,
    courseLogo: "Public/course-logo-4.jpg",
    courseImage: "Public/course-image-4.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Muhurata – Advance Course",
    courseHeading: "Auspicious Timing",
    courseDetails: "It includes practical rules, dosha cancellations, and real-life case studies",
    coursePrice: 4800,
    courseFinalPrice: 3799,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-5.jpg",
    courseImage: "Public/course-image-5.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Tajika Varshaphal Course",
    courseHeading: "Annual Predictions",
    courseDetails: "It covers Varshesh, Muntha, Sahams, aspects, yogas, and yearly predictions with practical chart-based application.",
    coursePrice: 4200,
    courseFinalPrice: 3199,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-6.jpg",
    courseImage: "Public/course-image-6.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Medical Astrology",
    courseHeading: "Health Through Astrology",
    courseDetails: "Course offers a structured approach to understanding health and disease through planetary influences.",
    coursePrice: 4300,
    courseFinalPrice: 3299,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-7.jpg",
    courseImage: "Public/course-image-7.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Prashna (Horary) astrology",
    courseHeading: "Question Based Predictions",
    courseDetails: "Learn to answer specific questions using the moment of inquiry.",
    coursePrice: 4500,
    courseFinalPrice: 3499,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-8.jpg",
    courseImage: "Public/course-image-8.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Vastu Shastra",
    courseHeading: "Space Harmony & Remedies",
    courseDetails: "Learn to identify basic Vastu defects and apply simple, practical remedies to create harmony, health, and prosperity.",
    coursePrice: 3500,
    courseFinalPrice: 2699,
    courseDiscount: 801,
    courseLogo: "Public/course-logo-9.jpg",
    courseImage: "Public/course-image-9.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "Tithi Pravesha Analysis",
    courseHeading: "Lunar Birthday Charts",
    courseDetails: "This course offers a clear understanding of lunar birthday charts & their role in annual predictions",
    coursePrice: 4600,
    courseFinalPrice: 3599,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-10.jpg",
    courseImage: "Public/course-image-10.jpg",
    dropDownStatus: "True"
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully!");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");

    // Insert new courses
    const result = await Course.insertMany(coursesData);
    console.log(`Successfully added ${result.length} courses to the database!`);
    console.log("\nCourses added:");
    result.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseName} - ₹${course.courseFinalPrice}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

connectDB();
