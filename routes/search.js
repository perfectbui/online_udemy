const router = require("express").Router();
const Course = require("../models/Course");
const Category = require("../models/Category");

router.get("/keyword/:content", async (req, res) => {
  const contentCourse = req.params.content;
  const category = await Category.find({}).lean();
  const courses = await Course.find({
    $text: { $search: contentCourse },
  }).populate("teacher");
  res.render("search", { courses, category });
});

router.get("/price", async (req, res) => {
  const category = await Category.find({}).lean();
  const courses = await Course.find({}).sort({ price: 1 }).populate("teacher");
  res.render("search", { courses, category });
});

router.get("/rating", async (req, res) => {
  const category = await Category.find({}).lean();
  const courses = await Course.find({}).sort({ rating: 1 }).populate("teacher");
  res.render("search", { courses, category });
});

router.get("/category/:name", async (req, res) => {
  const name = req.params.name;
  const existedCourse = await Course.find({ field: name }).lean();
  const category = await Category.find({}).lean();
  res.render("search", { courses: existedCourse, category });
});

module.exports = router;