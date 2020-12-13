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
    .populate("student.data");
  existedCourse.numViews = existedCourse.numViews + 1;
  await existedCourse.save();
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
  if (existedCourse) {
    res.render("course", { course: existedCourse, relatedCourses });
  } else {
    res.send({ message: "course not found" });
  }
});



module.exports = router;
