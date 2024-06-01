const express = require("express")

const addHorseController = require("../controllers/addHorse");
const addHorseRouter = express.Router();

addHorseRouter.use("/addhorse", addHorseController.add_horse);

module.exports = addHorseRouter;