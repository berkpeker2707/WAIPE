const expressHandler = require("express-async-handler");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  smtpAccountCreationFunc,
  smtpForgotPasswordFunc,
} = require("../helpers/smtp");

//first step of sign in with email verification ***
const preSignupController = expressHandler(async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req?.body?.email });
    const userPhoneExists = await User.findOne({ phone: req?.body?.phone });

    if (userExists || userPhoneExists) {
      return res.json({
        accessToken: null,
        message: userExists ? "Email already exists." : "Phone already exists.",
      });
    }

    // const { password } = req.body;

    //save the user
    const newUserInvalidated = await User.create({
      email: req?.body?.email,
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      phone: req?.body?.phone,
      termsOfUse: req?.body?.termsOfUse,
      privacyPolicy: req?.body?.privacyPolicy,
      age: req?.body?.age,
      password: req?.body?.password,
      /* Defaults 1 days from now */
      expireAt: new Date(new Date().valueOf() + 86400000),
    });

    // const recieved = req.body.email;

    //generate token
    const verificationToken =
      await newUserInvalidated.createAccountVerificationToken();

    await newUserInvalidated.save();

    await smtpAccountCreationFunc(verificationToken, newUserInvalidated, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

//second step of sign in with email verification ***
const verifySignupController = expressHandler(async (req, res) => {
  try {
    const token = req.body.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    //find this user by token
    const userFound = await User.findOne({
      accountVerificationToken: hashedToken,
      accountVerificationTokenExpires: { $gt: new Date() },
    });

    if (!userFound) throw new Error("Token expired, try again later");
    //update isAccountVerified to true
    userFound.accountVerified = true;
    userFound.accountVerificationToken = undefined;
    userFound.accountVerificationTokenExpires = undefined;
    await userFound.save();

    await userFound.updateOne({ $unset: { expireAt: 1 } });
    // await userFound.updateOne({ accountVerified: true });

    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json(error);
  }
});

//sign up without email verification ***
const signupController = expressHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  const userPhoneExists = await User.findOne({ phone: req?.body?.phone });

  if (userExists || userPhoneExists) {
    return res.json({
      accessToken: null,
      message: userExists ? "Email already exists." : "Phone already exists.",
    });
  }
  // const { password } = req.body;

  try {
    const user = await User.create({
      email: req?.body?.email,
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      phone: req?.body?.phone,
      termsOfUse: req?.body?.termsOfUse,
      privacyPolicy: req?.body?.privacyPolicy,
      age: req?.body?.age,
      password: req?.body?.password,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//sign in controller ***
const signinController = expressHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        accessToken: null,
        message: "User Not found.",
      });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "365d", // 365 day
    });

    res.status(200).json({
      accessToken: token,
      message: null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//sign in via google (NOT WORKING)
const signinWithGoogleController = expressHandler(async (req, res) => {
  try {
    res.status(200).json("Login");
  } catch (error) {
    res.status(500).json(error);
  }
});

//forgot password controller ***
const forgotPasswordController = expressHandler(async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.userEmail });
  const recievedEmail = req.body.userEmail;
  if (!emailExists) {
    throw new Error("Wrong email.");
  }

  try {
    //generate token
    const verificationToken =
      await emailExists.createAccountVerificationToken();

    //save the user
    await emailExists.save();

    await smtpForgotPasswordFunc(verificationToken, recievedEmail, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

//verify password controller ***
const verifyPasswordController = expressHandler(async (req, res) => {
  const newPassword = req.body.newPassword;
  const token = req.body.token;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (newPassword) {
    userFound.password = newPassword;
    await userFound.save();
  } else {
    res.status(401);
    throw new Error("Invalid Entry!");
  }

  if (!userFound) throw new Error("Token expired, try again later");
  //update isAccountVerified to true
  userFound.accountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;

  await userFound.updateOne({ $unset: { expireAt: 1 } });

  await userFound.save();
  res.json(userFound);
});

module.exports = {
  preSignupController,
  verifySignupController,
  signupController,
  signinController,
  signinWithGoogleController,
  forgotPasswordController,
  verifyPasswordController,
};
