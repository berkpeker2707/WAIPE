const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  postImage: { type: String, required: true },
  postDescription: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId },
  like: [{ type: Array }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

module.exports = Post = mongoose.model("Post", PostSchema);
