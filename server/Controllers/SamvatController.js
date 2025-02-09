const Samvat = require("../Models/SamvatModel")

const createSamvat = async (req, res) => {
    try {
        const { Vikram, Shaka, Nakshatra, NakshatraTill, Karan, KaranTill } = req.body
        const errorMessage = []
        if (!Vikram) errorMessage.push("Vikram Is Must Required")
        if (!Shaka) errorMessage.push("Shaka Is Must Required")
        if (!Nakshatra) errorMessage.push("Nakshatra Is Must Required")
        if (!NakshatraTill) errorMessage.push("NakshatraTill Is Must Required")
        if (!Karan) errorMessage.push("Karan Is Must Required")
        if (!KaranTill) errorMessage.push("KaranTill Is Must Required")

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(",")
            })
        }

        const record = await Samvat.countDocuments()
        if (record > 0) {
            await Samvat.deleteMany()
        }

        const newRecord = new Samvat({ Vikram, Shaka, Nakshatra, NakshatraTill, Karan, KaranTill })
        await newRecord.save()
        res.status(200).json({
            success: false,
            message: "Record Creted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        const data = await Samvat.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: false,
            message: "Record Found Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// Get a single Samvat record by ID
const getSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Samvat.findById(id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Record Found Successfully",
            data: record
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update a Samvat record by ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { Vikram, Shaka, Nakshatra, NakshatraTill, Karan, KaranTill } = req.body;

        // Find the record and update
        const updatedRecord = await Samvat.findByIdAndUpdate(id, { Vikram, Shaka, Nakshatra, NakshatraTill, Karan, KaranTill }, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record Updated Successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a Samvat record by ID
const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Samvat.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Record Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createSamvat, getRecord, getSingle, deleteRecord, update
}