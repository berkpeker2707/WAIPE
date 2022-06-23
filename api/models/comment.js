const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  comment: [
    {
      ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      commentText: String,
      likes: [],
    },
  ],
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
