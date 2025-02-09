const { createBlog, getBlog, getSingleBlog, updateBlog, deleteBlog } = require("../Controllers/BlogController")
const upload = require("../MiddleWare/Multer")

const BlogRouter = require("express").Router()

BlogRouter.post("/add-blog", upload.single("blogImage"), createBlog)
BlogRouter.get("/get-blog", getBlog)
BlogRouter.get("/get-single-blog/:id", getSingleBlog)
BlogRouter.put("/update-blog/:id", upload.single("blogImage"), updateBlog)
BlogRouter.delete("/delete-blog/:id", deleteBlog)

module.exports = BlogRouter