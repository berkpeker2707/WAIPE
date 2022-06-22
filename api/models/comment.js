const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    comments: [
      {
        ownerID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        commentText: { type: String, required: true },
        likes: [],
      },
    ],
  },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
