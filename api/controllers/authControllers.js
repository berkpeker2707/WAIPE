const expressHandler = require("express-async-handler");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const signupController = expressHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  const userPhoneExists = await User.findOne({ phone: req?.body?.phone });

  if (userExists || userPhoneExists) {
    return res.json({
      accessToken: null,
      message: userExists ? "Email already exists." : "Phone already exists.",
    });
  }
  const { password } = req.body;

  try {
    const user = await User.create({
      email: req?.body?.email,
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      phone: req?.body?.phone,
      termsOfUse: req?.body?.termsOfUse,
      privacyPolicy: req?.body?.privacyPolicy,
      age: req?.body?.age,
      password: bcrypt.hashSync(password, 8),
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
      expiresIn: "365d", // 24 hours
    });

    res.status(200).json({
      accessToken: token,
      message: null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const signinWithGoogleController = expressHandler(async (req, res) => {
  try {
    res.status(200).json("Login");
  } catch (error) {
    res.status(500).json(error);
  }
});

const forgotPasswordController = expressHandler(async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.userEmail });

  if (!emailExists) {
    throw new Error("Wrong email.");
  }

  try {
    //generate token
    const verificationToken =
      await emailExists.createAccountVerificationToken();

    //save the user
    await emailExists.save();

    //smtp config starts
    var SibApiV3Sdk = require("sib-api-v3-sdk");
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      process.env.SENDINBLUE_API_KEY;

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        sender: { email: "sendinblue@sendinblue.com", name: "WAIPE" },
        subject: "Reset Password Link",
        htmlContent: `<h2>Please click the link to activate your account within a day.</h2>
        <a href=${process.env.CLIENT_URL}/verify-account/${verificationToken}>Click to Verify</a>`,
        messageVersions: [
          {
            to: [
              {
                email: req.body.userEmail,
              },
            ],
          },
        ],
      })
      .then(
        function (data) {
          // console.log(data);
          return res.json("Verification Mail Sent!");
        },
        function (error) {
          console.error(error);
          throw new Error(error);
        }
      );
    //smtp config ends
  } catch (error) {
    res.status(500).json(error);
  }
});

//verify account controller
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
  await userFound.save();
  res.json(userFound);
});

module.exports = {
  signupController,
  signinController,
  signinWithGoogleController,
  forgotPasswordController,
  verifyPasswordController,
};
