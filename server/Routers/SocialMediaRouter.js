const { createRecord, getRecords, getSingleRecord, updateRecord, deleteRecord } = require("../Controllers/SocialMediaController");
const SocialMediaRouter = require("express").Router();

// Route to create a new social media record
SocialMediaRouter.post("/create-social-media", createRecord);

// Route to get all social media records
SocialMediaRouter.get("/get-all-vedio", getRecords);

// Route to get a single social media record by ID
SocialMediaRouter.get("/get-single-vedio/:id", getSingleRecord);

// Route to update a social media record by ID
SocialMediaRouter.put("/update-vedio/:id", updateRecord);

// Route to delete a social media record by ID
SocialMediaRouter.delete("/delete-vedio/:id", deleteRecord);

module.exports = SocialMediaRouter;
