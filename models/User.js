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
  myOwnCourses: [
    {
      type: schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  myCourses: [
    {
      type: schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  wishlist: [
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
  isAdmin : {
    type:Boolean,
    default:false,
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
