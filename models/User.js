const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  degree: String,
  age: Number,
  address: String,
  phone: String,
  myCourses:[{
    type: schema.Types.ObjectId,
    ref: "Course",
  }],
  watchList: [
    {
      type: schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  isTeacher: {
    type: Boolean,
    default: false,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
