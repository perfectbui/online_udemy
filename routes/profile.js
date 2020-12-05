const express = require('express');
const router = express.Router();



router.get("/teacher",(req,res) => res.render("profile/teacher"));
router.get("/student",(req,res) => res.render("profile/student"));
router.get("/student/mycourse",(req,res) => res.render("profile/student/mycourse"));
router.get("/student/wishlist",(req,res) => res.render("profile/student/wishlist"));
router.get("/student/edit",(req,res) => res.render("profile/student/edit"));






module.exports = router;
