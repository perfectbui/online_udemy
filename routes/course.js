const express = require("express");
const dateFormat = require("dateformat");
const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const router = express.Router();

router.get("/:id", async (req, res) => {
    const idCourse = req.params.id;
    const existedCourse = await Course.findById(idCourse)
        .populate("teacher")
        .populate("comments.user")
        .populate("student.data");
    existedCourse.numViews = existedCourse.numViews + 1;
    await existedCourse.save();
    const result = await Course.aggregate([{
        $match: {
            $and: [
                { field: existedCourse.field },
                { _id: { $ne: existedCourse._id } },
            ],
        },
    },
    {
        $addFields: {
            length: {
                $size: "$student",
            },
        },
    },
    {
        $sort: {
            length: -1,
        },
    },
    {
        $limit: 5,
    },
    ]);
    const relatedCourses = await Course.populate(result, { path: "teacher" });
    if (existedCourse) {
        res.render("course", { course: existedCourse, relatedCourses });
    } else {
        res.send({ message: "course not found" });
    }
});

router.get("/mycourse/:idCourse/:sectionCourse", async (req, res) => {
    const idCourse = req.params.idCourse;
    const existedCourse = await Course.findById(idCourse).lean()
    const sectionCourse = req.params.sectionCourse
    const title = existedCourse.video[sectionCourse].title;
    let location = existedCourse.video[sectionCourse].location.split("");
    let tmpIndex = 0;
    for (let i = location.length - 1; i >= 0; i--) {
        if (location[i] == "\\") {
            tmpIndex = i
            break
        }
    }
    location = location.slice(tmpIndex + 1).join("");
    for (let i = 0; i < existedCourse.video.length; i++) {
        existedCourse.video[i] = { ...existedCourse.video[i], _idCourse: idCourse }
    }
    if (existedCourse) {
        res.render("mycourse/course", { course: existedCourse, title, pathName: location });
    } else {
        res.send({ message: "course not found" });
    }
});

module.exports = router;
