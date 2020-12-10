const express = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const idCourse = req.params.id;
  const existedCourse = await Course.findById(idCourse)
    .populate("teacher")
    .populate("comments.user")
    .populate("student.data")
    .lean();
  const result = await Course.aggregate([
    {
      $match: {
        $and: [
          { field: existedCourse.field },
          { _id: { $ne: existedCourse._id } },
        ],
      },
    },
    {
      $addFields: {
        length: {
          $size: "$student",
        },
      },
    },
    {
      $sort: {
        length: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  const relatedCourses = await Course.populate(result, { path: "teacher" });
  console.log(relatedCourses);
  if (existedCourse) {
    res.render("course", { course: existedCourse, relatedCourses });
  } else {
    res.send({ message: "course not found" });
  }
});

router.get("/category/:name", async (req, res) => {
  const name = req.params.name;
  const existedCourse = await Course.find({ field: name }).lean();
  const category = await Category.find({}).lean();
  if (existedCourse.length > 0) {
    res.render("category/courses", { courses: existedCourse, category });
  } else {
    res.send({ message: "Courses not found" });
  }
});

module.exports = router;
