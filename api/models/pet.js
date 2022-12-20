const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String },
  age: { type: Number },
  biography: { type: String, default: "" },
  species: { type: String, required: true },
  breed: { type: String },
  interestedIn: { type: String },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  petPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = Pet = mongoose.model("Pet", PetSchema);
