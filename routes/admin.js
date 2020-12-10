const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");

router.get("/category", authenticate, async (req, res) => {
  const category = await Category.find({}).lean();
  res.render("admin/category", {
    category,
  });
});

router.post("/category/add", authenticate, async (req, res) => {
  const { categoryName } = req.body;
  const newCategory = new Category({
    name: categoryName,
  });
  await newCategory.save();
  res.render("admin/category", {
    category: newCategory,
  });
});

router.delete("/category/delete", authenticate, async (req, res) => {
  try {
    const { idCategory } = req.body;
    const category = await Category.findById(idCategory);
    const existedCourse = await Course.find({ field: category.name });
    if (existedCourse.length > 0) {
      res.send({
        message: "There is the course in this category",
        success: false,
      });
    } else {
      await Category.remove({ _id: idCategory });
      res.send({ message: "Delete category success", success: true });
    }
  } catch (error) {
    res.status(400).send({ message: "Delete category failed" });
  }
});

router.get("/profile", authenticate, async (req, res) => {
  const idAdmin = req.decoded._id;
  const adminData = await User.findById(idAdmin);
  res.render("admin/profile", {
    admin: adminData,
  });
});

router.get("/teachers", authenticate, async (req, res) => {
  const listTeacher = await User.find({ isTeacher: true }).lean();
  res.render("admin/teachers", {
    listTeacher,
  });
});

router.get("/students", authenticate, async (req, res) => {
  const listStudent = await User.find({ isStudent: true }).lean();
  res.render("admin/students", {
    listStudent,
  });
});

router.get("/courses", authenticate, async (req, res) => {
  const listCourse = await Course.find({}).populate("teacher").lean();
  res.render("admin/courses", { listCourse });
});

router.delete("/course/delete", authenticate, async (req, res) => {
  try {
    const { idCourse } = req.body;
    await Course.remove({ _id: idCourse });
    res.send({ message: "Delete course success" });
  } catch (error) {
    res.status(400).send({ message: "Delete course failed" });
  }
});

router.delete("/student/delete", authenticate, async (req, res) => {
  try {
    const { idStudent } = req.body;
    await User.remove({ _id: idStudent });
    res.send({ message: "Delete student success" });
  } catch (error) {
    res.status(400).send({ message: "Delete student failed" });
  }
});

router.delete("/teacher/delete", authenticate, async (req, res) => {
  try {
    const { idTeacher } = req.body;
    await User.remove({ _id: idTeacher });
    res.send({ message: "Delete teacher success" });
  } catch (error) {
    res.status(400).send({ message: "Delete teacher failed" });
  }
});

module.exports = router;
