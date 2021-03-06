const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const upload = require("../libs/multer");
const uploadv2 = require("../libs/multerv2")
const cloudinary = require("../libs/cloudinary");
const Course = require("../models/Course");
const User = require("../models/User");
const  Category = require("../models/Category")

router.get("/course", async (req, res) => {
  const category = await Category.find({}).lean();
  res.render("upload/course",{category,videoQuantity:10});
});

router.post(
  "/image",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let resultUrl = result.url;
      if (result.width > 550) {
        const image = result.url.split(`/${process.env.CLOUD_NAME}/`)[1];
        resultUrl = cloudinary.url(image, {
          width: 550,
          crop: "fill",
        });
      }

      res.status(200).json({
        imageUrl: resultUrl,
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

router.post(
  "/video",
  authenticate,
  uploadv2.single("videoFile"),
  async (req, res) => {
    try {
      // const result = await cloudinary.uploader.upload(req.file.path);
      // let resultUrl = result.url;
      // if (result.width > 550) {
      //   const image = result.url.split(`/${process.env.CLOUD_NAME}/`)[1];
      //   resultUrl = cloudinary.url(image, {
      //     width: 550,
      //     crop: "fill",
      //   });
      // }
      console.log(req.file.path)

      res.status(200).json({
        videoLocation: req.file.path,
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

router.post("/course", authenticate, async (req, res) => {
  try {
    const idUserPost = req.decoded._id;
    const {
      mainContent,
      previewContent,
      detailContent,
      name,
      field,
      price,
      image,
      isDone,
      video,
    } = req.body;
    console.log("video")
    console.log(video);
    const newCourse = new Course({
      name,
      field,
      price,
      image,
      mainContent,
      detailContent,
      previewContent,
      isDone,
      video,
      timeCreated: Date.now(),
      lastUpdated: Date.now(),
      teacher: idUserPost,
    });
    await newCourse.save();
    const existedUser = await User.findById(idUserPost);
    existedUser.myOwnCourses.push(newCourse._id);
    await existedUser.save();
    res.status(200).json({
      course: newCourse,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/wishlist", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { idCourse } = req.body;
    const existedUser = await User.findById(idUser);
    existedUser.wishlist = existedUser.wishlist.filter(
      (course) => course != idCourse
    );
    existedUser.wishlist.push(idCourse);
    await existedUser.save();
    res.status(200).json({
      user: existedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/buyCourse", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { idCourse } = req.body;
    const existedCourse = await Course.findById(idCourse);
    existedCourse.student.push({data:idUser,timeCreated:Date.now()});
    existedCourse.save();
    const existedUser = await User.findById(idUser);
    existedUser.myCourses = existedUser.myCourses.filter(
      (course) => course != idCourse
    );
    existedUser.myCourses.push(idCourse);
    await existedUser.save();
    res.status(200).json({
      user: existedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/comment", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { idCourse, contentComment, rating } = req.body;
    const existedCourse = await Course.findById(idCourse);
    existedCourse.comments.push({
      user: idUser,
      content: contentComment,
      rating: parseInt(rating, 10),
    });
    let totalRating = 0;
    for (let i = 0; i < existedCourse.comments.length; i++) {
      totalRating =
        totalRating + parseInt(existedCourse.comments[i].rating, 10);
    }
    totalRating = Math.floor(totalRating / existedCourse.comments.length);
    existedCourse.rating = totalRating;
    await existedCourse.save();
    res.status(200).json({
      course: existedCourse,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
