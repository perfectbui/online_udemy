const express = require("express");
const router = express.Router();
const {authenticate } =require("../middlewares/auth")
const upload = require("../libs/multer");
const cloudinary = require("../libs/cloudinary");
const Course = require("../models/Course");

router.get("/course", (req, res) => res.render("upload/course"));

router.post("/image",
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
  
  router.post('/course', authenticate, async (req, res) => {
    try {
      const idUserPost = req.decoded._id;
      const { name, field,price, image } = req.body;
      const newCourse = new Course({
        name,
        field,
        price,
        image,
        teacher: idUserPost,
      });
      await newCourse.save();
  
      res.status(200).json({
        course: newCourse,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  });


module.exports = router;
