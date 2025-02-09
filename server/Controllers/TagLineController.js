const TagLine = require('../Models/TagModel');

// Create a new TagLine
const createTagLine = async (req, res) => {
    try {
        const { tagLine } = req.body;
        if (!tagLine) {
            return res.status(400).json({ message: "TagLine is required" });
        }
        const countDocument =await TagLine.countDocuments()
        if (countDocument > 0) {
            await TagLine.deleteMany()
        }
        const newTagLine = new TagLine({
            tagLine
        });

        const savedTagLine = await newTagLine.save();
        res.status(201).json({ message: 'TagLine created successfully', data: savedTagLine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all TagLines
const getAllTagLines = async (req, res) => {
    try {
        const tagLines = await TagLine.find();
        console.log(tagLines)
        res.status(200).json({ message: 'TagLines fetched successfully', data: tagLines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single TagLine by ID
const getTagLineById = async (req, res) => {
    try {
        const { id } = req.params;

        const tagLine = await TagLine.findById(id);

        if (!tagLine) {
            return res.status(404).json({ message: 'TagLine not found' });
        }

        res.status(200).json({ message: 'TagLine fetched successfully', data: tagLine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a TagLine by ID
const updateTagLine = async (req, res) => {
    try {
        const { id } = req.params;
        const { tagLine } = req.body;

        // Validate input
        if (!tagLine) {
            return res.status(400).json({ message: "TagLine is required" });
        }

        const updatedTagLine = await TagLine.findByIdAndUpdate(id, { tagLine }, { new: true });

        if (!updatedTagLine) {
            return res.status(404).json({ message: 'TagLine not found' });
        }

        res.status(200).json({ message: 'TagLine updated successfully', data: updatedTagLine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a TagLine by ID
const deleteTagLine = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTagLine = await TagLine.findByIdAndDelete(id);

        if (!deletedTagLine) {
            return res.status(404).json({ message: 'TagLine not found' });
        }

        res.status(200).json({ message: 'TagLine deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTagLine,
    getAllTagLines,
    getTagLineById,
    updateTagLine,
    deleteTagLine
};
