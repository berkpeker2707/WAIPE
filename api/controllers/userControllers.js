const user = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

const getExampleController = expressAsyncHandler(async (req, res) => {
  try {
    res.json("I AM TEST AND DOING JUST FINE!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  getExampleController,
};
