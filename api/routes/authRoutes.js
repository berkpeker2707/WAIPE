const express = require("express");
const { login, signup } = require("../controllers/authControllers");

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.get("/login", login);

module.exports = authRoutes;
