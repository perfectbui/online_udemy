const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CategorySchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
