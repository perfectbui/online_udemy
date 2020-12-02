const db = require("../utils/db");

module.exports = {
  all() {
    return db.load("select * from user");
  },
  checkEmailExist(email) {
    return db.load(`select * from user where email="${email}"`);
  },
  insert(userName, email, password, age, address, phone) {
      console.log(`INSERT INTO user (userName, email, password, age, address, phone) VALUES ('${userName}', '${email}',
      '${password}',${age},'${address}','${phone}')`);
    return db.load(
      `INSERT INTO user (userName, email, password, age, address, phone) VALUES ('${userName}', '${email}',
      '${password}',${age},'${address}','${phone}')`
    );
  },
};
