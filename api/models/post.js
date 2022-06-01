const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  postImage: { type: String, required: true },
  postDescription: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "pet" },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "like" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

module.exports = Post = mongoose.model("Post", PostSchema);
