const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  // likeModel: {
  //   type: String,
  //   enum: ["post", "comment"],
  // },
  like: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    { likeType: { type: String } },
  ],
});

module.exports = Like = mongoose.model("Like", LikeSchema);
