const express = require('express');
const router = express.Router();
const User1 = require('../models/User1');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validate = require('../middlewares/validate');

router.get("/teacher",(req,res)=> res.render("signup/teacher"));

router.get("/student",(req,res)=> res.render("signup/student"));

router.post(
	'/student',
	validate.register,
	validate.checkEmailExist,
	async (req, res) => {
		try {
			let { userName, email, password, age, address, phone,degree } = req.body;

			const hashPassword = await bcrypt.hash(password, saltRounds);

			const newUser = new User({
				userName,
				email,
				password: hashPassword,
				address,
				phone,
				degree,
				isStudent:true,
				age: parseInt(age, 10),
			});

			await newUser.save();
			// User1.insert(userName, email, hashPassword, parseInt(age, 10), address, phone);
            res.redirect("/signin");
		} catch (err) {
			res.render('signup/student',{message:"Sign Up Failed"});
		}
	}
);

router.post(
	'/teacher',
	validate.register,
	validate.checkEmailExist,
	async (req, res) => {
		try {
			let { userName, email, password, age, degree, address, phone } = req.body;

			const hashPassword = await bcrypt.hash(password, saltRounds);

			const newUser = new User({
				userName,
				email,
				password: hashPassword,
				address,
				phone,
				degree,
				isTeacher:true,
				age: parseInt(age, 10),
			});

			await newUser.save();
			// User1.insert(userName, email, hashPassword, parseInt(age, 10), address, phone);
            res.redirect("/signin");
		} catch (err) {
			res.render('signup/teacher',{message:"Sign Up Failed"});
		}
	}
);

module.exports = router;
