const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  petID: { type: mongoose.Schema.Types.ObjectId, ref: "pet", required: true },
  picture: { type: String, required: true },
  postDescription: { type: String },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "like" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
});

module.exports = Post = mongoose.model("Post", PostSchema);
