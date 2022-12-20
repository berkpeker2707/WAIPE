const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  petID: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  picture: { type: String, required: true },
  postDescription: { type: String },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
});

module.exports = Post = mongoose.model("Post", PostSchema);
