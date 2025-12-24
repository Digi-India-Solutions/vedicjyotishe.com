const { createCourse, getCourse, getCourseById, deleteCourse, updateCourse, getCourseByName } = require("../Controllers/CourseController")
const upload = require("../MiddleWare/Multer")

const CourseRouter = require("express").Router()

CourseRouter.post("/add-course", upload.fields([
    { name: "courseLogo", maxCount: 1 },
    { name: "courseImage", maxCount: 1 }
]), createCourse)
CourseRouter.put("/update-course/:id", upload.fields([
    { name: "courseLogo", maxCount: 1 },
    { name: "courseImage", maxCount: 1 }
]), updateCourse)

CourseRouter.get("/get-course", getCourse)
CourseRouter.get("/get-single-course/:id", getCourseById)
CourseRouter.get("/get-course-by-name/:name", getCourseByName)
CourseRouter.delete("/delete-course/:id", deleteCourse)

module.exports = CourseRouter
