const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

router.get("/:id",async (req,res)=>{
    const idCourse = req.params.id;
    const existedCourse = await  Course.findById(idCourse).populate('teacher').lean();
    if(existedCourse) {
        console.log(existedCourse)
        res.render("course", {course:existedCourse})
    } else {
        res.send({message:"course not found"})
    }
});

module.exports = router;
