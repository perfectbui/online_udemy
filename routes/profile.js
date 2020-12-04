const express = require('express');
const router = express.Router();



router.get("/teacher",(req,res) => res.render("profile/teacher"));
router.get("/student",(req,res) => res.render("profile/student"));
router.get("/mycourse",(req,res) => res.render("profile/mycourse"));
router.get("/wishlist",(req,res) => res.render("profile/wishlist"));





module.exports = router;
