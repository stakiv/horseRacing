const express = require("express")

const racetrackController = require("../controllers/racetrack");
const racetrackRouter = express.Router();

racetrackRouter.use("/racetracks", racetrackController.find_racetrack_data);

module.exports = racetrackRouter;