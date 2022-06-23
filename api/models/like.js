const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  like: [
    {
      ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      likeType: String,
    },
  ],
});

module.exports = Like = mongoose.model("Like", LikeSchema);
