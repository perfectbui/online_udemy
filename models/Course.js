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
  teacher: {
    type: schema.Types.ObjectId,
    ref:'User'
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
  content: {
    type: String,
  },
  student: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
  timeCreated : {
    type:Date,
    default:Date.now()
  }
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
