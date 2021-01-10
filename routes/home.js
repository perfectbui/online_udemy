const router = require("express").Router();
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const allNewCourses = await Course.find({})
    .limit(10)
    .populate("teacher")
    .sort({ timeCreated: -1 })
    .lean();

    const category = await Category.find({}).lean();

  let allFavoriteCourses = await Course.find({})
    .populate("teacher")
    .populate("student.data");
    allFavoriteCourses = allFavoriteCourses
    .filter((favoriteCourse) =>
      favoriteCourse.student.filter(
        (student) => Math.abs(student.timeCreated - Date.now()) / 86400000 <= 7
      ).length > 0
        ? true
        : false
    )
    .sort((a, b) => b.student.length - a.student.length)
    .slice(0, 5);

  let bestCategory =  allFavoriteCourses.map(course => course.field)
  bestCategory=bestCategory.filter((category,index)=>bestCategory.indexOf(category) === index)

  const allMostViewCourses = await Course.find({}).sort({numViews:-1}).limit(10).populate("teacher");

  var perPage = 4;

  var favpage = parseInt(req.query.favpage) || 1;
  var favstart = (favpage -1) * perPage;
  var favend = favpage* perPage;

  var mostviewpage = parseInt(req.query.mostviewpage) || 1;
  var mostviewstart = (mostviewpage -1) * perPage;
  var mostviewend = mostviewpage* perPage;

  var newCoursesPage = parseInt(req.query.newcoursespage) || 1;
  var newCoursesStart = (newCoursesPage -1) * perPage;
  var newCoursesEnd = newCoursesPage* perPage;

  let favoriteCourses =  allFavoriteCourses.slice(favstart, favend);
  let mostViewCourses =  allMostViewCourses.slice(mostviewstart, mostviewend);
  let newCourses =  allNewCourses.slice(newCoursesStart, newCoursesEnd);
 
  res.render("home", {
    newCourses,
    category,
    mostViewCourses,
    favoriteCourses,
    bestCategory,
    favPageTotal: allFavoriteCourses.length / perPage,
    currentFavPage: favpage,
    mostViewPageTotal: allMostViewCourses.length / perPage,
    currentMostViewPage: mostviewpage,
    newCoursesPageTotal: allNewCourses.length / perPage,
    currentNewCoursesPage: newCoursesPage
  });
});

module.exports = router;
