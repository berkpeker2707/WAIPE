const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  likeBy: [{ type: Array, default: [] }],
});

module.exports = Like = mongoose.model("Like", LikeSchema);
