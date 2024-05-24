const express = require("express")

const jockeyController = require("../controllers/jockeys");
const jockeyRouter = express.Router();

jockeyRouter.use("/races", jockeyController.find_jockeys);

module.exports = jockeyRouter;