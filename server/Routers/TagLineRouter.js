const { createTagLine, getAllTagLines, getTagLineById, deleteTagLine, updateTagLine } = require("../Controllers/TagLineController")

const TagLineRouter = require("express").Router()

TagLineRouter.post("/create-tagline", createTagLine)
TagLineRouter.get("/get-tagline", getAllTagLines)
TagLineRouter.get("/get-single-tagline/:id", getTagLineById)
TagLineRouter.delete("/delete-tagline/:id", deleteTagLine)
TagLineRouter.put("/update-tagline/:id", updateTagLine)


module.exports = TagLineRouter