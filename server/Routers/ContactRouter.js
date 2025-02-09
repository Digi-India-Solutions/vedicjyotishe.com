const { createContact, getAllContacts, updateContactStatus, deleteContact } = require("../Controllers/ContactController")

const ContactRouter = require("express").Router()


ContactRouter.post("/send-contact" ,createContact)
ContactRouter.get("/get-contact" ,getAllContacts)
ContactRouter.put("/update-contact-status/:id" ,updateContactStatus)
ContactRouter.put("/delete-contact/:id" ,deleteContact)

module.exports = ContactRouter