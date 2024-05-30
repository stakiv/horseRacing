const express = require("express")

const raceItemController = require("../controllers/raceitem");
const raceItemRouter = express.Router();

raceItemRouter.use("/raceitem", raceItemController.find_race_data);

module.exports = raceItemRouter;