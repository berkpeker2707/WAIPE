const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, default: "" },
  biography: { type: String, default: "" },
  locations: { country: { type: String }, city: { type: String } },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  blockedUsers: { type: Array, default: [] },
  blockedPets: { type: Array, default: [] },
  followedPets: { type: Array, default: [] },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
  termsOfUse: { type: Boolean, required: true },
  privacyPolicy: { type: Boolean, required: true },
  age: { type: Boolean, required: true },
  visibility: { type: Boolean, default: true },
  handOrientation: { type: String, default: "right" },
});

module.exports = User = mongoose.model("User", UserSchema);
