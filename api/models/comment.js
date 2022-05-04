const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentTex: { type: String, required: true },
  like: { type: Array },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
