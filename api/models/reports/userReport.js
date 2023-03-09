const mongoose = require("mongoose");

const UserReportSchema = mongoose.Schema({
  reportSubject: { type: String, require: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = UserReport = mongoose.model("UserReport", UserReportSchema);
