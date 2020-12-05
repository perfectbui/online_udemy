const express = require("express");
const { authenticate } = require("../middlewares/auth");
const User = require("../models/User");
const router = express.Router();

router.get("/teacher", (req, res) => res.render("profile/teacher"));

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
    existedUser.save();
    res.render("profile/student/edit", { user: existedUser });
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

module.exports = router;
