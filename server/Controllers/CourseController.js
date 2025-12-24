const Course = require("../Models/CourseModel");
const fs = require("fs").promises;
const path = require("path");

const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.access(fileToDelete);
            await fs.unlink(fileToDelete);
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        console.log("File not found or already deleted:", filePath);
    }
};

const createCourse = async (req, res) => {
    let courseLogoPath = null;
    let courseImagePath = null;

    try {
        const { courseName, courseHeading, courseDetails, coursePrice, courseFinalPrice, courseDiscount, dropDownStatus } = req.body;
        const errorMessage = [];

        // Validate inputs
        if (!courseName) errorMessage.push("Course Name is required");
        if (!courseHeading) errorMessage.push("Course Heading is required");
        if (!courseDetails) errorMessage.push("Course Details are required");
        if (!coursePrice) errorMessage.push("Course Price is required");
        if (!courseFinalPrice) errorMessage.push("Course Final Price is required");

        if (!req.files || !req.files.courseLogo || !req.files.courseImage) {
            errorMessage.push("Both Course Logo and Course Image are required");
        } else {
            courseLogoPath = req.files.courseLogo[0].path;
            courseImagePath = req.files.courseImage[0].path;
        }

        if (errorMessage.length > 0) {
            deleteFile(courseLogoPath);
            deleteFile(courseImagePath);

            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        const changeUpperCase = courseName.toUpperCase()

        const existCourseName = await Course.findOne({ courseName: changeUpperCase })
        if (existCourseName) {
            deleteFile(courseLogoPath);
            deleteFile(courseImagePath);
            return res.status(400).json({
                success: false,
                message: "This Course Name already exists"
            })
        }

        // Create new course
        const newCourse = new Course({
            courseName: changeUpperCase,
            courseHeading,
            courseDetails,
            coursePrice,
            courseFinalPrice,
            courseDiscount,
            courseLogo: courseLogoPath,
            courseImage: courseImagePath,
            dropDownStatus: dropDownStatus || "False",
        });

        // Attempt to save the course
        await newCourse.save();
        console.log("Course saved successfully:", newCourse);

        res.status(200).json({
            success: true,
            message: "Course created successfully!",
            course: newCourse
        });
    } catch (error) {
        console.error("An error occurred, attempting to delete uploaded files...");
        deleteFile(courseLogoPath);
        deleteFile(courseImagePath);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Courses
const getCourse = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            return res.status(404).json({
                success: false,
                message: "Courses not found"
            });
        }
        const reverseData = courses.reverse()
        res.status(200).json({
            success: true,
            data: reverseData
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Course by ID
const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Course by Name
const getCourseByName = async (req, res) => {
    const { name } = req.params;
    try {
        const course = await Course.findOne({ courseName: name });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    let courseLogoPath = null;
    let courseImagePath = null;
    try {
        const { courseName, courseHeading, courseDetails, coursePrice, courseFinalPrice, courseDiscount, dropDownStatus } = req.body;
        const errorMessage = [];
        if (!courseName) errorMessage.push("Course Name is required");
        if (!courseHeading) errorMessage.push("Course Heading is required");
        if (!courseDetails) errorMessage.push("Course Details are required");
        if (!coursePrice) errorMessage.push("Course Price is required");
        if (!courseFinalPrice) errorMessage.push("Course Final Price is required");

        if (req.files) {
            if (req.files.courseLogo) {
                courseLogoPath = req.files.courseLogo[0].path;
            }
            if (req.files.courseImage) {
                courseImagePath = req.files.courseImage[0].path;
            }
        }

        const changeUpperCase = courseName.toUpperCase()

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.courseName != changeUpperCase) {
            const existCourseName = await Course.findOne({ courseName: changeUpperCase })
            if (existCourseName) {
                return res.status(400).json({
                    success: false,
                    message: "This Course Name already exists"
                })
            }
        }

        // Update fields
        course.courseName = changeUpperCase || course.courseName;
        course.courseHeading = courseHeading || course.courseHeading;
        course.courseDetails = courseDetails || course.courseDetails;
        course.coursePrice = coursePrice || course.coursePrice;
        course.courseFinalPrice = courseFinalPrice || course.courseFinalPrice;
        course.courseDiscount = courseDiscount || course.courseDiscount;
        course.dropDownStatus = dropDownStatus || course.dropDownStatus;

        if (courseLogoPath) {
            deleteFile(course.courseLogo);
            course.courseLogo = courseLogoPath;
        }

        if (courseImagePath) {
            deleteFile(course.courseImage);
            course.courseImage = courseImagePath;
        }

        // Save updated course
        await course.save();
        console.log("Course updated successfully:", course);

        res.status(200).json({
            success: true,
            message: "Course updated successfully!",
            course
        });
    } catch (error) {
        console.error("An error occurred while updating the course:", error);
        if (req.files) {
            if (req.files.courseLogo) await fs.unlink(req.files.courseLogo[0].path);
            if (req.files.courseImage) await fs.unlink(req.files.courseImage[0].path);
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete Course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        deleteFile(course.courseLogo);
        deleteFile(course.courseImage);
        await Course.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully!"
        });
    } catch (error) {
        console.error("An error occurred while deleting the course:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createCourse, getCourse, getCourseById, updateCourse, deleteCourse, getCourseByName
};
