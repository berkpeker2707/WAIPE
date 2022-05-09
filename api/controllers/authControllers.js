const User = require("../models/user");
const expressHandler = require("express-async-handler");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const signup = expressHandler(async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    phone,
    termsOfUse,
    privacyPolicy,
    age,
  } = req.body;

  try {
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      termsOfUse: termsOfUse,
      privacyPolicy: privacyPolicy,
      age: age,
      password: bcrypt.hashSync(password, 8),
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const login = expressHandler(async (req, res) => {
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

    var token = jwt.sign({ id: user.id }, "dbapp-secret-key", {
      expiresIn: 86400, // 24 hours
    });

    res.json(token);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  login,
  signup,
};
