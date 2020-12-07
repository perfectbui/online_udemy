const express = require("express");
const { authenticate } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { isValidPassword } = require("../libs/utils");
const User = require("../models/User");
const router = express.Router();

// router.get("/teacher", (req, res) => res.render("profile/teacher/editProfile"));

router.get("/student", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser).lean();
    res.render("profile/student", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/teacher", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser).lean();
    res.render("profile/teacher", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/student/edit", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser).lean();
    res.render("profile/student/edit", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/teacher/edit", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser).lean();
    res.render("profile/teacher/edit", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/student/edit", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { userName, age, address, degree, phone } = req.body;
    const existedUser = await User.findById(idUser);
    existedUser.userName = userName;
    existedUser.degree = degree;
    existedUser.age = age;
    existedUser.phone = phone;
    existedUser.address = address;
    console.log(existedUser);
    existedUser.save();
    res.status(200).send({ message: "Edit success" });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/teacher/edit", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { userName, age, address, degree, phone } = req.body;
    const existedUser = await User.findById(idUser);
    existedUser.userName = userName;
    existedUser.degree = degree;
    existedUser.age = age;
    existedUser.phone = phone;
    existedUser.address = address;
    console.log(existedUser);
    existedUser.save();
    res.status(200).send({ message: "Edit success" });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/student/change-password", authenticate, async (req, res) => {
  try {
    res.render("profile/student/change-password");
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/teacher/change-password", authenticate, async (req, res) => {
  try {
    res.render("profile/teacher/change-password");
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/student/change-password", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { oldPassword, newPassword } = req.body;
    const existedUser = await User.findById(idUser);
    let isValid = await isValidPassword(oldPassword, existedUser.password);
    if (isValid) {
      const newHashPassword = await bcrypt.hash(newPassword, 10);
      existedUser.password = newHashPassword;
      existedUser.save();
      res.status(200).send({ message: "Change password success" });
    } else {
      res.status(400).json({
        message: "Password incorrect",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/teacher/change-password", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { oldPassword, newPassword } = req.body;
    const existedUser = await User.findById(idUser);
    let isValid = await isValidPassword(oldPassword, existedUser.password);
    if (isValid) {
      const newHashPassword = await bcrypt.hash(newPassword, 10);
      existedUser.password = newHashPassword;
      existedUser.save();
      res.status(200).send({ message: "Change password success" });
    } else {
      res.status(400).json({
        message: "Password incorrect",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/student/mycourse", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser)
      .populate({
        path: "myCourses",
        populate: {
          path: "teacher",
        },
      })
      .lean();
    res.render("profile/student/mycourse", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/teacher/mycourse", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser)
      .populate({
        path: "myCourses",
        populate: {
          path: "teacher",
        },
      })
      .lean();
    res.render("profile/student/mycourse", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/student/wishlist", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const existedUser = await User.findById(idUser)
      .populate({
        path: "wishlist",
        populate: {
          path: "teacher",
        },
      })
      .lean();
    res.render("profile/student/wishlist", { user: existedUser });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/student/wishlist/delete", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const idCourse = req.body.idCourse;
    const existedUser = await User.findById(idUser);
    existedUser.wishlist = existedUser.wishlist.filter(
      (course) => course._id != idCourse
    );
    existedUser.save();
    res
      .status(200)
      .send({ message: "Delete this course out of wishlist success" });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
