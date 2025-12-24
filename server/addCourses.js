const mongoose = require("mongoose");
require("dotenv").config();
const Course = require("./Models/CourseModel");

const coursesData = [
  {
    courseName: "VEDIC ASTROLOGY",
    courseHeading: "Master the Fundamentals of Vedic Astrology",
    courseDetails: "Learn the complete foundations of Vedic Astrology including planetary positions, house divisions, and natal chart interpretation. This comprehensive course covers all aspects needed to understand astrological concepts.",
    coursePrice: 5000,
    courseFinalPrice: 3999,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-1.jpg",
    courseImage: "Public/course-image-1.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "PRASHNA HORARY",
    courseHeading: "Predictive Astrology Through Questions",
    courseDetails: "Prashna Horary is the art of answering specific questions through astrological methods. Learn to interpret horary charts and provide accurate predictions based on the time of questioning.",
    coursePrice: 4500,
    courseFinalPrice: 3499,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-2.jpg",
    courseImage: "Public/course-image-2.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "NAKSHATRA COURSE",
    courseHeading: "Understanding the 27 Lunar Mansions",
    courseDetails: "Deep dive into the Nakshatras (lunar mansions) and their significance in Vedic Astrology. Understand the characteristics, rulerships, and applications of all 27 nakshatras.",
    coursePrice: 4000,
    courseFinalPrice: 2999,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-3.jpg",
    courseImage: "Public/course-image-3.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "ASHTAKAVARGA",
    courseHeading: "Advanced Strength Analysis System",
    courseDetails: "Master the Ashtakavarga system for precise calculations of planetary strengths and house strengths. Learn to create and interpret Ashtakavarga charts for accurate predictions.",
    coursePrice: 5500,
    courseFinalPrice: 4299,
    courseDiscount: 1201,
    courseLogo: "Public/course-logo-4.jpg",
    courseImage: "Public/course-image-4.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "MUHURATA - ADVANCE",
    courseHeading: "Auspicious Timing for All Occasions",
    courseDetails: "Learn advanced techniques for selecting auspicious times (muhuratas) for important life events. This course covers selection of auspicious moments for business, marriage, travel, and more.",
    coursePrice: 4800,
    courseFinalPrice: 3799,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-5.jpg",
    courseImage: "Public/course-image-5.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "TAJIKA VARSHAPHAL",
    courseHeading: "Annual Horoscopy Predictions",
    courseDetails: "Understand the Tajika system for creating annual horoscopes. Learn to predict yearly events and trends using Tajika Varshaphal techniques for accurate annual readings.",
    coursePrice: 4200,
    courseFinalPrice: 3199,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-6.jpg",
    courseImage: "Public/course-image-6.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "MEDICAL ASTROLOGY",
    courseHeading: "Astrological Health Insights",
    courseDetails: "Learn how planetary positions relate to health and wellness. This course covers disease identification through astrology and astrological remedies for health issues.",
    coursePrice: 4300,
    courseFinalPrice: 3299,
    courseDiscount: 1001,
    courseLogo: "Public/course-logo-7.jpg",
    courseImage: "Public/course-image-7.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "NUMEROLOGY",
    courseHeading: "Divine Meaning of Numbers",
    courseDetails: "Explore the mystical world of numbers and their meanings. Learn numerology for name analysis, date analysis, and life path calculations based on ancient numerological principles.",
    coursePrice: 3800,
    courseFinalPrice: 2899,
    courseDiscount: 901,
    courseLogo: "Public/course-logo-8.jpg",
    courseImage: "Public/course-image-8.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "VASTU BASIC",
    courseHeading: "Fundamentals of Space Harmony",
    courseDetails: "Learn the basics of Vastu Shastra for creating harmonious living and working spaces. This foundational course covers Vastu principles and their practical applications.",
    coursePrice: 3500,
    courseFinalPrice: 2699,
    courseDiscount: 801,
    courseLogo: "Public/course-logo-9.jpg",
    courseImage: "Public/course-image-9.jpg",
    dropDownStatus: "True"
  },
  {
    courseName: "TITHI PRAVESHA CHART",
    courseHeading: "Timing of Life Events Through Tithis",
    courseDetails: "Master the art of using Tithi Pravesha charts for precise timing of life events. Learn to calculate and interpret Tithi Pravesha charts for accurate astrological predictions.",
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
