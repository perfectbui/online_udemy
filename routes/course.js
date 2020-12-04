const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const idCourse = req.params.id;
  const existedCourse = await Course.findById(idCourse)
    .populate("teacher")
    .populate("comments.user")
    .populate("student")
    .lean();
    console.log(existedCourse);
  if (existedCourse) {
    res.render("course", { course: existedCourse, rating: [1, 2, 3, 4] });
  } else {
    res.send({ message: "course not found" });
  }
});

module.exports = router;
