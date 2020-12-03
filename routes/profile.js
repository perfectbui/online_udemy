const express = require('express');
const router = express.Router();



router.get("/teacher",(req,res) => res.render("profile/teacher"));
router.get("/student",(req,res) => res.render("profile/student"));



module.exports = router;
