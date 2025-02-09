const Contact = require("../Models/ContactModel");


// Create a new contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone, comments } = req.body;
        const errorMessage = []
        if (!name) errorMessage.push("Name is must required")
        if (!email) errorMessage.push("Email is must required")
        if (!phone) errorMessage.push("Pnone Number is must required")
        if (!comments) errorMessage.push("Comments is must required")

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Contact Is must Required"
            })
        }
        // Create new contact document
        const newContact = new Contact({
            name,
            email,
            phone,
            comments
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: newContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create contact",
            error: error.message
        });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve contacts",
            error: error.message
        });
    }
};

// Update only the contactStatus of a contact by ID
const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { contactStatus } = req.body;

        // Check if contactStatus is provided in the request
        if (!contactStatus) {
            return res.status(400).json({
                success: false,
                message: "Contact status is required"
            });
        }

        // Find contact by ID and update contactStatus
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { contactStatus },
            { new: true, runValidators: true }
        );

        // If contact is not found
        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact status updated successfully",
            data: updatedContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update contact status",
            error: error.message
        });
    }
};




// Delete a contact by ID
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            error: error.message
        });
    }
};


module.exports = {
    createContact, getAllContacts, deleteContact ,updateContactStatus
}