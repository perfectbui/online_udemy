const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	userName: {
		type: String,
		required: true,
	},
	age: Number,
	address: String,
	phone: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;