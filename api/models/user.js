const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  accountVerificationToken: String,
  accountVerificationTokenExpires: Date,
  picture: { type: String, default: "" },
  biography: { type: String, default: "" },
  locations: { country: { type: String }, city: { type: String } },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  blockedUsers: { type: Array, default: [] },
  blockedPets: { type: Array, default: [] },
  followedPets: { type: Array, default: [] },
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
  termsOfUse: { type: Boolean, required: true },
  privacyPolicy: { type: Boolean, required: true },
  age: { type: Boolean, required: true },
  visibility: { type: Boolean, default: true },
  handOrientation: { type: String, default: "right" },
});

//Password reset/forget

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return resetToken;
};

module.exports = User = mongoose.model("User", UserSchema);
