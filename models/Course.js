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
  previewContent: {
    type: String,
    required: true,
  },
  teacher: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    default: 1,
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
    {
      user: { type: schema.Types.ObjectId, ref: "User" },
      content: String,
      rating: String,
    },
  ],
  student: [
    {
      data: {
        type: schema.Types.ObjectId,
        ref: "User",
      },
      timeCreated: {
        type: Date,
      },
    },
  ],
  numViews:{
    type:Number,
    default:0
  },
  lastUpdated: {
    type: Date,
  },
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});
CourseSchema.index({name: 'text'});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
