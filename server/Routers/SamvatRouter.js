const { createSamvat, getRecord, getSingle, update, deleteRecord } = require("../Controllers/SamvatController")

const SamvatRouter = require("express").Router()

SamvatRouter.post("/create-samvat" , createSamvat)
SamvatRouter.get("/get-samvat" , getRecord)
// Route to get a single Samvat record by ID
SamvatRouter.get("/get-samvat/:id", getSingle);

// Route to update a Samvat record by ID
SamvatRouter.put("/update-samvat/:id", update);

// Route to delete a Samvat record by ID
SamvatRouter.delete("/delete-samvat/:id", deleteRecord);
module.exports = SamvatRouter