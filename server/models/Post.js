const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  name: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("posts", PostSchema);
