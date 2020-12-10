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

  // let favoriteCourses;
  // const favoriteCourses1 = await Course.find({})
  //   .populate("teacher")
  //   .populate("student.data")
  //   .exec((err, docs) => {
  //     favoriteCourses = docs.map((doc) => {
  //       doc.student.filter(
  //         (student) => Math.abs(student.timeCreated - Date.now()) > 100
  //       );
  //     });
  //     console.log(
  //       docs.map((doc) => {
  //         doc.student.filter(
  //           (student) => Math.abs(student.timeCreated - Date.now()) > 100
  //         );
  //       })
  //     );
  //   });

  // console.log(favoriteCourses);
  const category = await Category.find({}).lean();
  res.render("home", {
    newCourses,
    category,
    // favoriteCourses,
  });
});

module.exports = router;
