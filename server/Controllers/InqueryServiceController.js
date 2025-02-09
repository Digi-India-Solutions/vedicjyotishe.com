const Razorpay = require('razorpay');
const InqueryService = require("../Models/InqueryServiceModel");
const crypto = require('crypto');
// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_API_KEY, // Replace with your Razorpay key id
    key_secret: process.env.RAZOR_SECRET_KEY // Replace with your Razorpay key secret
});

// Create an inquiry service
const createInqueryService = async (req, res) => {
    try {
        console.log(req.body)
        const {
            serviceId,
            name,
            phone,
            email,
            gender,
            maritalStatus,
            dateOfBirth,
            birthTime,
            countryOrstate,
            place,
            longitude,
            latitude,
            comment,
            address,
            apartment,
            city,
            state,
            country,
            postalCode,
            additionalInfo,
            amount // Make sure to include amount in the request body for Razorpay payment
        } = req.body;

        const errorMessage = [];

        // Required field validations
        if (!name) errorMessage.push("Name is required.");
        if (!phone) errorMessage.push("Phone is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!gender) errorMessage.push("Gender is required.");
        if (!maritalStatus) errorMessage.push("Marital Status is required.");
        if (!dateOfBirth) errorMessage.push("Date of Birth is required.");
        if (!birthTime) errorMessage.push("birthTime is required.");
        if (!countryOrstate) errorMessage.push("Country/State is required.");
        if (!place) errorMessage.push("Place is required.");
        if (!comment) errorMessage.push("Comment are required.");
        if (!address) errorMessage.push("address is required.");
        if (!city) errorMessage.push("City is required.");
        if (!state) errorMessage.push("State is required.");
        if (!country) errorMessage.push("Country is required.");
        if (!postalCode) errorMessage.push("Postal Code is required.");
        if (!amount) errorMessage.push("Payment amount is required."); // Validate payment amount

        // If there are validation errors, return them
        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation errors",
                errors: errorMessage
            });
        }

        // Create a Razorpay order
        const options = {
            amount: amount * 100, // Amount is in paisa (100 paisa = 1 INR)
            currency: 'INR',
            receipt: `receipt_${new Date().getTime()}`,
            notes: {
                key1: 'value3',
                key2: 'value2'
            }
        };

        const order = await razorpay.orders.create(options);

        // Create new inquiry document
        const newInquiry = new InqueryService({
            serviceId,
            name,
            phone,
            email,
            gender,
            maritalStatus,
            dateOfBirth,
            birthTime,
            countryOrstate,
            place,
            longitude,
            latitude,
            comment,
            address,
            apartment, // Optional
            city,
            state,
            country,
            postalCode,
            additionalInfo, // Optional
            paymentStatus: "Pending", // Set initial payment status
            orderId: order.id // Store the order ID for future reference
        });

        await newInquiry.save();

        res.status(201).json({
            success: true,
            message: "Inquiry created successfully",
            data: { ...newInquiry.toObject(), orderId: order.id, amount: order.amount }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to create inquiry",
            error: error.message
        });
    }
};


// Get all inquiries
const getAllInqueries = async (req, res) => {
    try {
        const inqueries = await InqueryService.find().populate("serviceId")
        const reverseData = inqueries.reverse();
        res.status(200).json({
            success: true,
            data: reverseData
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve inquiries",
            error: error.message
        });
    }
};

// Delete an inquiry by ID
const deleteInquery = async (req, res) => {
    try {
        const inquiry = await InqueryService.findByIdAndDelete(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete inquiry",
            error: error.message
        });
    }
};


const verifyPayment = async (req, res) => {
    console.log(req.body)
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_SECRET_KEY)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // Update the inquiry payment status in the database
        const inquiry = await InqueryService.findOne({ orderId: razorpay_order_id });
        inquiry.paymentStatus = "Complete"
        await inquiry.save()
        console.log("my updated", inquiry)

        return res.status(200).json({
            success: true,
            message: "Payment verification successful",
            inquiry,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};





module.exports = {
    createInqueryService,
    getAllInqueries,
    deleteInquery,
    verifyPayment
};
