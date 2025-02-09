const Day = require("../Models/DayModel")

const createDay = async (req, res) => {
    try {
        const { sunRiseTime, sunsetTime, moonRiseTime, moonsetTime } = req.body
        const errorMessage = []
        if (!sunRiseTime) errorMessage.push("sun Rise time is must required")
        if (!sunsetTime) errorMessage.push("sun Set time is must required")
        if (!moonRiseTime) errorMessage.push("Moon Rise time is must required")
        if (!moonsetTime) errorMessage.push("Moon Set time is must required")

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        const oldRecord = await Day.countDocuments()
        if (oldRecord > 0) {
            await Day.deleteMany()
        }

        const saveRecord = new Day({ sunRiseTime, sunsetTime, moonRiseTime, moonsetTime })
        await saveRecord.save()
        return res.status(200).json({
            success: true,
            message: "New Day Record Added Successfully",
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
        const data = await Day.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: true,
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

const getSingleRecord = async (req, res) => {
    try {
        const data = await Day.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: true,
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

// Edit an existing Day record
const editDay = async (req, res) => {
    try {
        const { id } = req.params;
        const { sunRiseTime, sunsetTime, moonRiseTime, moonsetTime } = req.body;

        const updatedData = await Day.findByIdAndUpdate(
            id,
            { sunRiseTime, sunsetTime, moonRiseTime, moonsetTime },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Day Record Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Day Record Updated Successfully",
            data: updatedData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a Day record
const deleteDay = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await Day.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: "Day Record Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Day Record Deleted Successfully"
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
    createDay, getRecord, editDay, deleteDay ,getSingleRecord
}