const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressHandler = require("express-async-handler");
const User = require("../models/user");

const verifyToken = expressHandler(async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  try {
    const token = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({ message: "Unauthorized!" });
    }

    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  verifyToken,
};
