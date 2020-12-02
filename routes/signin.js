const express = require('express');
const router = express.Router();
const { isValidPassword, issueJwt } = require('../libs/utils');
const validate = require('../middlewares/validate');
const User = require('../models/User');
const User1 = require('../models/User1')

router.get("/",(req,res) => res.render("signin"));

router.post('/', validate.login, async (req, res) => {
	try {
		const { email, password } = req.body;
		let responseToClient = {};
		const existUser = await User.findOne({
			email,
		});
		// const rowDataPacket = await User1.checkEmailExist(email);
		// const existUser = {...JSON.parse(JSON.stringify(rowDataPacket))[0]};
		if (existUser === null) {
			responseToClient = {
				message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
            };
			res.render('signin',responseToClient);
		} else {
			if (!existUser.password) {
				responseToClient = {
					message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
                };
                // res.status(401).json(responseToClient);
                res.render('signin',responseToClient);
			} else {
				let isValid = await isValidPassword(
					password,
					existUser.password
				);
				console.log("hehe");
				if (isValid) {
					issueJwt(existUser, res);
					res.redirect("/");
				} else {
					responseToClient = {
						message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
					};
					res.render('signin',responseToClient);
				}
			}
		}
	} catch (err) {
		res.render('signin',{message:"FAILED"});
	}
});

module.exports = router;
