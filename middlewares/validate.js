const User1 = require("../models/User1");
const User = require("../models/User");

module.exports = {
  register: (req, res, next) => {
    let { email, userName, password, age, address, phone } = req.body;
    const validateName = /^[A-Za-z]+([\ A-Za-z]+)*/;
    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let responseToClient;
    let isError = false;
    if (!email || !userName || !password || !age || !phone || !address) {
      responseToClient = {
        message: "Hãy điền đầy đủ thông tin",
      };
      isError = true;
    } else if (!validateName.test(userName) || !validateEmail.test(email)) {
      responseToClient = {
        message: "Tên hoặc email không hợp lệ",
      };
      isError = true;
    }

    if (isError) {
      responseToClient = JSON.stringify(responseToClient);
      res.render("signup", { message: responseToClient });
    } else {
      next();
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      let responseToClient = {
        message: "Hãy điền đầy đủ thông tin",
      };
      res.render("signin", responseToClient);
    } else {
      next();
    }
  },
  checkEmailExist: async (req, res, next) => {
    const { email } = req.body;
  //   const row = await User1.checkEmailExist(email);
  //   if (row.length === 0) {
  //     next();
  //   } else {
	// 	res.status(400).json({
	// 		message: 'Đã tồn tại email. Hãy chọn email khác',
	// 	})
	// }
    const existEmail = await User.findOne({
    	email,
    });

    if (existEmail) {
    	res.status(400).json({
    		message: 'Đã tồn tại email. Hãy chọn email khác',
    	});
    } else {
    	next();
    }
  },
};
