const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  like: [
    {
      ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      likeType: String,
    },
  ],
});

module.exports = Like = mongoose.model("Like", LikeSchema);
