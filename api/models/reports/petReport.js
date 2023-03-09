const mongoose = require("mongoose");

const PetReportSchema = mongoose.Schema({
  reportSubject: { type: String, require: true },
  petID: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = PetReport = mongoose.model("PetReport", PetReportSchema);
