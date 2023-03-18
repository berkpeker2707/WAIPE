const mongoose = require("mongoose");

const PostReportSchema = mongoose.Schema({
  reportSubject: { type: String, require: true },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    require: true,
  },
  petID: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  picture: { type: String, required: true },
  postDescription: { type: String, required: true },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = PostReport = mongoose.model("PostReport", PostReportSchema);
