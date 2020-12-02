const express = require('express');
const router = express.Router();
const User1 = require('../models/User1');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validate = require('../middlewares/validate');

router.get("/",(req,res)=> res.render("signup"));

router.post(
	'/',
	validate.register,
	validate.checkEmailExist,
	async (req, res) => {
		try {
			let { userName, email, password, age, address, phone } = req.body;

			const hashPassword = await bcrypt.hash(password, saltRounds);

			const newUser = new User({
				userName,
				email,
				password: hashPassword,
				address,
				phone,
				age: parseInt(age, 10),
			});

			await newUser.save();
			// User1.insert(userName, email, hashPassword, parseInt(age, 10), address, phone);
            res.redirect("/signin");
		} catch (err) {
			res.render('signup',{message:"Sign Up Failed"});
		}
	}
);

module.exports = router;
