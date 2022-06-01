const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "like" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
