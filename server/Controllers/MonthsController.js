const Month = require("../Models/MonthsModel")

const createMonths = async (req, res) => {
    try {
        const { Amanta, Purnimanta, Tithi, TithiTill, Yog, YogTill } = req.body
        const errorMessage = []
        if (!Amanta) errorMessage.push("Amanta is must required")
        if (!Purnimanta) errorMessage.push("Purnimanta is must required")
        if (!Tithi) errorMessage.push("Tithi is must required")
        if (!TithiTill) errorMessage.push("TithiTill is must required")
        if (!Yog) errorMessage.push("Yog is must required")
        if (!YogTill) errorMessage.push("YogTill is must required")

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(",")
            })
        }
        const oldRecord = await Month.countDocuments()
        console.log(oldRecord)
        if (oldRecord > 0) {
            await Month.deleteMany()
        }
        const newRecord = new Month({ Amanta, Purnimanta, Tithi, TithiTill, Yog, YogTill })
        await newRecord.save()
        return res.status(200).json({
            success: true,
            message: "New Months Create Successfully"
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
        const data = await Month.find()
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
        const { id } = req.params;
        console.log(id)
        const data = await Month.findById(id);
        console.log(data)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Record Found Successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { Amanta, Purnimanta, Tithi, TithiTill, Yog, YogTill } = req.body;

        // Find the record by ID first
        const record = await Month.findById(id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }

        // Update only the fields that are provided
        if (Amanta) record.Amanta = Amanta;
        if (Purnimanta) record.Purnimanta = Purnimanta;
        if (Tithi) record.Tithi = Tithi;
        if (TithiTill) record.TithiTill = TithiTill;
        if (Yog) record.Yog = Yog;
        if (YogTill) record.YogTill = YogTill;

        // Save the updated record
        await record.save();

        res.status(200).json({
            success: true,
            message: "Record Updated Successfully",
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


// Delete a month record by ID
const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Month.findByIdAndDelete(id);

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
    createMonths, getRecord, getSingleRecord, updateRecord, deleteRecord
}