const express = require("express")

const jockeyController = require("../controllers/jockeys");
const jockeyRouter = express.Router();

jockeyRouter.use("/jockeys", jockeyController.find_jockeys);
jockeyRouter.use("/jockeys", jockeyController.find_jockeys_sort);
jockeyRouter.use("/jockeys", jockeyController.find_jockeys_filter);

module.exports = jockeyRouter;