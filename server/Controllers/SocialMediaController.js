const SocialMedia = require("../Models/SocialMediaModel");

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { link, contentHeading, contentDetails ,activeStatus } = req.body;
        const errorMessage = [];

        if (!link) errorMessage.push("Link is must required");
        if (!contentHeading) errorMessage.push("Content Heading is must required");
        if (!contentDetails) errorMessage.push("Content Details is must required");

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        // Create a new record
        const newRecord = new SocialMedia({ link, contentHeading, contentDetails ,activeStatus: activeStatus || false});
        await newRecord.save();

        res.status(200).json({
            success: true,
            message: "Record created successfully",
            data: newRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getRecords = async (req, res) => {
    try {
        const records = await SocialMedia.find();
        if (!records) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        const reverseData = records.reverse()
        res.status(200).json({
            success: true,
            message: "Records retrieved successfully",
            data: reverseData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        const record = await SocialMedia.findById(req.params.id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Record retrieved successfully",
            data: record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { link, contentHeading, contentDetails ,activeStatus } = req.body;
        const record = await SocialMedia.findByIdAndUpdate(
            req.params.id,
            { link, contentHeading, contentDetails ,activeStatus },
            { new: true, runValidators: true }
        );

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record updated successfully",
            data: record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const deleteRecord = async (req, res) => {
    try {
        const record = await SocialMedia.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Record deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createRecord,
    getRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
};
