const mongoose = require("mongoose");

const PetReportSchema = mongoose.Schema({
  reportSubject: { type: String, require: true },
  petID: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  biography: { type: String, ref: "User" },
});

module.exports = PetReport = mongoose.model("PetReport", PetReportSchema);
