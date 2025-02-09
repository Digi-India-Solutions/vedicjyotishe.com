const GetInTouch = require("../Models/GetInTouchModel");

// CREATE: Add a new record
const createRecord = async (req, res) => {
    try {
        const { name, email, phone, comment } = req.body;
        const errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!phone) errorMessage.push("Phone number is required.");
        if (!comment) errorMessage.push("Comment is required.");

        // If there are validation errors, return a response with the errors
        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errorMessage,
            });
        }

        // Create a new record in the database
        const newRecord = new GetInTouch({
            name,
            email,
            phone,
            comment,
            status: "Pending", // default status
        });

        // Save the record
        await newRecord.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: "Your message has been successfully submitted.",
            data: newRecord,
        });
    } catch (error) {
        console.error("Error creating record:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// READ (All): Fetch all records
const getAllRecords = async (req, res) => {
    try {
        const records = await GetInTouch.find();
        return res.status(200).json({
            success: true,
            data: records,
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// READ (One): Fetch a specific record by ID
const getRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await GetInTouch.findById(id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found.",
            });
        }
        return res.status(200).json({
            success: true,
            data: record,
        });
    } catch (error) {
        console.error("Error fetching record:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// UPDATE: Update a specific record
const updateRecord = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, comment, status } = req.body;

    try {
        const record = await GetInTouch.findById(id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found.",
            });
        }

        // Update fields
        if (name) record.name = name;
        if (email) record.email = email;
        if (phone) record.phone = phone;
        if (comment) record.comment = comment;
        if (status) record.status = status; // Update the status field

        // Save the updated record
        await record.save();

        return res.status(200).json({
            success: true,
            message: "Record updated successfully.",
            data: record,
        });
    } catch (error) {
        console.error("Error updating record:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// DELETE: Delete a specific record
const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await GetInTouch.findByIdAndDelete(id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Record deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

module.exports = {
    createRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
};
