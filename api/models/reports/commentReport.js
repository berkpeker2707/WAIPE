const mongoose = require("mongoose");

const CommentReportSchema = mongoose.Schema({
  reportSubject: { type: String, require: true },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    require: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  commentText: { type: String, require: true },
  commentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    require: true,
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = CommentReport = mongoose.modelNames(
  "CommentReport",
  CommentReportSchema
);
