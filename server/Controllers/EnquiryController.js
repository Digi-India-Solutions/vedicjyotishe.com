const Enquiry = require("../Models/EnquiryModel");
const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.SEND_MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

// Function to send email
const sendEnquiryEmail = async (enquiryData) => {
    try {
        const mailOptions = {
            from: process.env.SEND_MAIL_ID,
            to: "divya.parihar25@gmail.com",
            subject: `New Course Enquiry - ${enquiryData.courseName}`,
            html: `
                <h2>New Course Enquiry Received</h2>
                <hr/>
                <h3>Personal Details</h3>
                <p><strong>Name:</strong> ${enquiryData.name}</p>
                <p><strong>Email:</strong> ${enquiryData.email}</p>
                <p><strong>Country Code:</strong> ${enquiryData.countryCode}</p>
                <p><strong>Mobile Number:</strong> ${enquiryData.mobileNo}</p>
                <hr/>
                <h3>Professional Background</h3>
                <p><strong>Working Professional:</strong> ${enquiryData.workingProfessional || "Not specified"}</p>
                <p><strong>Current Role:</strong> ${enquiryData.currentRole || "Not specified"}</p>
                <hr/>
                <h3>Astrology Background</h3>
                <p><strong>Studied Astrology Earlier:</strong> ${enquiryData.studiedAstrology || "Not specified"}</p>
                <p><strong>Current Level:</strong> ${enquiryData.astrologyLevel || "Not specified"}</p>
                <hr/>
                <h3>Course Interest</h3>
                <p><strong>Course Name:</strong> ${enquiryData.courseName}</p>
                <p><strong>Purpose of Learning:</strong> ${enquiryData.learningPurpose || "Not specified"}${enquiryData.learningPurpose === "Other" ? ` - ${enquiryData.otherPurpose}` : ""}</p>
                <hr/>
                <h3>Address</h3>
                <p><strong>Country:</strong> ${enquiryData.country}</p>
                <p><strong>State:</strong> ${enquiryData.state || "Not specified"}</p>
                <p><strong>City:</strong> ${enquiryData.city}</p>
                <hr/>
                <h3>Learning Preferences</h3>
                <p><strong>Time per Week:</strong> ${enquiryData.timePerWeek || "Not specified"}</p>
                <p><strong>Preferred Days:</strong> ${enquiryData.preferredDays || "Not specified"}</p>
                <p><strong>Language Preference:</strong> ${enquiryData.language}</p>
                <hr/>
                <p><strong>Additional Message:</strong> ${enquiryData.message || "No message provided"}</p>
                <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to easydevs1@gmail.com");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const createEnquiry = async (req, res) => {
    try {
        const { 
            name, email, countryCode, mobileNo, courseName, state, city, country, language, message,
            workingProfessional, currentRole, studiedAstrology, astrologyLevel, 
            learningPurpose, otherPurpose, timePerWeek, preferredDays 
        } = req.body;
        const errorMessage = [];

        // Validate required inputs
        if (!name) errorMessage.push("Name is required");
        if (!email) errorMessage.push("Email is required");
        if (!countryCode) errorMessage.push("Country Code is required");
        if (!mobileNo) errorMessage.push("Mobile Number is required");
        if (!courseName) errorMessage.push("Course Name is required");
        if (!city) errorMessage.push("City is required");
        if (!country) errorMessage.push("Country is required");
        if (!language || !["Hindi", "English"].includes(language)) errorMessage.push("Language (Hindi or English) is required");

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        // Create new enquiry
        const newEnquiry = new Enquiry({
            name,
            email,
            countryCode,
            mobileNo,
            courseName,
            state: state || "",
            city,
            country,
            language,
            workingProfessional: workingProfessional || "",
            currentRole: currentRole || "",
            studiedAstrology: studiedAstrology || "",
            astrologyLevel: astrologyLevel || "",
            learningPurpose: learningPurpose || "",
            otherPurpose: otherPurpose || "",
            timePerWeek: timePerWeek || "",
            preferredDays: preferredDays || "",
            message: message || "",
            status: "Pending"
        });

        // Save the enquiry
        await newEnquiry.save();
        console.log("Enquiry saved successfully:", newEnquiry);

        // Send email notification
        await sendEnquiryEmail(newEnquiry);

        res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully!",
            enquiry: newEnquiry
        });
    } catch (error) {
        console.error("An error occurred while saving enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Enquiries
const getEnquiry = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        if (!enquiries) {
            return res.status(404).json({
                success: false,
                message: "Enquiries not found"
            });
        }
        const reverseData = enquiries.reverse()
        res.status(200).json({
            success: true,
            data: reverseData
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Enquiry by ID
const getEnquiryById = async (req, res) => {
    const { id } = req.params;
    try {
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }
        res.status(200).json({
            success: true,
            data: enquiry
        });
    } catch (error) {
        console.error("Error fetching enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Enquiry Status
const updateEnquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        // Update status
        enquiry.status = status;

        // Save updated enquiry
        await enquiry.save();
        console.log("Enquiry updated successfully:", enquiry);

        res.status(200).json({
            success: true,
            message: "Enquiry updated successfully!",
            enquiry
        });
    } catch (error) {
        console.error("An error occurred while updating enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete Enquiry
const deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }
        await Enquiry.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully!"
        });
    } catch (error) {
        console.error("An error occurred while deleting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createEnquiry, getEnquiry, getEnquiryById, updateEnquiry, deleteEnquiry
};
