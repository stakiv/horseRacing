const express = require("express")
const jockeyController = require("../controllers/jockeys");
const jockeyRouter = express.Router();

jockeyRouter.use("/jockeys", jockeyController.find_jockeys);

module.exports = jockeyRouter;