const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CourseSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  mainContent: {
    type: String,
    required: true,
  },
  detailContent: {
    type: String,
    required: true,
  },
  teacher: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comments: [
    { user: { type: schema.Types.ObjectId, ref: "User" }, content: String },
  ],
  student: [
    {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastUpdated: {
    type: Date,
  },
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
