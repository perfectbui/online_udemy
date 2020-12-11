const router = require("express").Router();
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const newCourses = await Course.find({})
    .limit(10)
    .populate("teacher")
    .sort({ timeCreated: -1 })
    .lean();

    const category = await Category.find({}).lean();

  let favoriteCourses = await Course.find({})
    .populate("teacher")
    .populate("student.data");
  favoriteCourses = favoriteCourses
    .filter((favoriteCourse) =>
      favoriteCourse.student.filter(
        (student) => Math.abs(student.timeCreated - Date.now()) / 86400000 <= 7
      ).length > 0
        ? true
        : false
    )
    .sort((a, b) => b.student.length - a.student.length)
    .slice(0, 5);

  let bestCategory =  favoriteCourses.map(course => course.field)
  bestCategory=bestCategory.filter((category,index)=>bestCategory.indexOf(category) === index)

  const mostViewCourses = await Course.find({}).sort({numViews:-1}).limit(10).populate("teacher");

  res.render("home", {
    newCourses,
    category,
    mostViewCourses,
    favoriteCourses,
    bestCategory,
  });
});

module.exports = router;
