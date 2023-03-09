const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const reportRoutes = express.Router();

module.exports = reportRoutes;
