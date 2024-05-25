const express = require("express")

const horseController = require("../controllers/horses");
const horseRouter = express.Router();

horseRouter.use("/horses", horseController.find_horses);

module.exports = horseRouter;