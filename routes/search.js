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
  const allExistedCourse = await Course.find({ field: name }).lean();
  var perPage = 3;
  const category = await Category.find({}).lean();

  var currentPage = parseInt(req.query.page) || 1;
  var totalPage = allExistedCourse.length / perPage;

  var start = (currentPage -1) * perPage;
  var end = currentPage* perPage;

  let existedCourse =  allExistedCourse.slice(start, end);

  res.render("search", { courses: existedCourse, category , currentPage, totalPage});
});

module.exports = router;
