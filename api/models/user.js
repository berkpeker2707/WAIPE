const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const randomatic = require("randomatic");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    passwordChangeAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    accountVerificationToken: { type: String },
    accountVerificationTokenExpires: { type: Date },
    picture: { type: String, default: "" },
    biography: { type: String, default: "" },
    locations: { country: { type: String }, city: { type: String } },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    termsOfUse: { type: Boolean, required: true },
    privacyPolicy: { type: Boolean, required: true },
    age: { type: Boolean, required: true },
    visibility: { type: Boolean, default: true },
    handOrientation: { type: String, default: "right" },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    postedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    archivedPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "post", default: [] },
    ],
    followedPets: { type: Array, default: [] },
    blockedUsers: { type: Array, default: [] },
    blockedPets: { type: Array, default: [] },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      /* Remove doc 5 min after specified date */
      expires: 300,
    },
  },
  {
    timestamps: true,
  }
);

//password encryption
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//account verification
UserSchema.methods.createAccountVerificationToken = async function () {
  // create token
  const verificationToken = randomatic("Aa0", 32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.accountVerificationTokenExpires = Date.now() + 3600 * 1000 * 24; //24 hour
  return verificationToken;
};

module.exports = User = mongoose.model("User", UserSchema);
