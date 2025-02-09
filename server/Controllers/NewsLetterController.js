const NewsLetter = require("../Models/NewsModel");

// Create a new newsletter record
const createRecord = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const newsRecord = new NewsLetter({ email });
        await newsRecord.save();

        return res.status(201).json({
            success: true,
            message: "Newsletter subscription created successfully",
            data: newsRecord,
        });
    } catch (error) {
        console.error("Error creating newsletter subscription:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get all newsletter records
const getAllRecords = async (req, res) => {
    try {
        const records = await NewsLetter.find();
        return res.status(200).json({
            success: true,
            data: records.reverse(),
        });
    } catch (error) {
        console.error("Error fetching newsletter subscriptions:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get a single newsletter record by ID
const getRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await NewsLetter.findById(id);
        
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: record,
        });
    } catch (error) {
        console.error("Error fetching the newsletter record:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Update a newsletter record by ID
const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, status } = req.body;

        const updatedRecord = await NewsLetter.findByIdAndUpdate(
            id,
            { email, status },
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Newsletter record updated successfully",
            data: updatedRecord,
        });
    } catch (error) {
        console.error("Error updating the newsletter record:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete a newsletter record by ID
const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deletedRecord = await NewsLetter.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Newsletter record deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting the newsletter record:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
