const router = require("express").Router();
const Course = require("../models/Course");
const Category = require("../models/Category")
const { authenticate } = require("../middlewares/auth");

router.get("/course/:id", authenticate, async (req, res) => {
  try {
    const idCourse = req.params.id;
    const existedCourse = await Course.findById(idCourse).lean();
    res.render("update/course", { course: existedCourse });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/course", authenticate, async (req, res) => {
  try {
    const {
      idCourse,
      mainContent,
      detailContent,
      previewContent,
      name,
      field,
      price,
      image,
      isDone
    } = req.body;
    const existedCourse = await Course.findById(idCourse);
    existedCourse.name = name;
    existedCourse.field = field;
    existedCourse.price = price;
    existedCourse.image = image;
    existedCourse.mainContent = mainContent;
    existedCourse.detailContent = detailContent;
    existedCourse.previewContent = previewContent;
    existedCourse.lastUpdated = Date.now();
    existedCourse.isDone = isDone;
    await existedCourse.save();
    const category = await Category.find({}).lean();
    res.status(200).json({
      course: existedCourse,
      category
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
