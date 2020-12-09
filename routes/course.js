const express = require("express");
const Course = require("../models/Course");
const Category = require("../models/Category")
const router = express.Router();

router.get("/:id", async (req, res) => {
  const idCourse = req.params.id;
  const existedCourse = await Course.findById(idCourse)
    .populate("teacher")
    .populate("comments.user")
    .populate("student")
    .lean();
  if (existedCourse) {
    res.render("course", { course: existedCourse });
  } else {
    res.send({ message: "course not found" });
  }
});

router.get("/category/:name", async (req, res) => {
  const name = req.params.name;
  const existedCourse = await Course.find({field:name}).lean();
  const category = await Category.find({}).lean();
  if (existedCourse.length>0) {
    res.render("category/courses", { courses: existedCourse,category });
  } else {
    res.send({ message: "Courses not found" });
  }
});

module.exports = router;
