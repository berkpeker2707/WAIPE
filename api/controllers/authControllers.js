const expressHandler = require("express-async-handler");
const User = require("../models/user");
let jwt = require("jsonwebtoken");
require("dotenv").config();
let bcrypt = require("bcryptjs");

const signupController = expressHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) {
    throw new Error("User already exists.");
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

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

const signinController = expressHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ message: "User Not found." });
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

    res.json(token);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  signupController,
  signinController,
};
