const express = require("express")

const horseController = require("../controllers/jockeys");
const horseRouter = express.Router();

horseRouter.use("/races", horseController.find_jockeys);

module.exports = horseRouter;