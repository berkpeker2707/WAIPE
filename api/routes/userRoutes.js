const express = require("express");

const userRoutes = express.Router();

const { getExampleController } = require("../controllers/userControllers");

userRoutes.get("/get/example", getExampleController);

module.exports = userRoutes;
