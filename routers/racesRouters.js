const express = require("express")

const raceController = require("../controllers/races");
const raceRouter = express.Router();

raceRouter.use("/races", raceController.find_races);
/*
raceRouter.use("/races", raceController.find_races_date);
raceRouter.use("/races", raceController.find_races_horse);
raceRouter.use("/races", raceController.find_races_jockey);*/

module.exports = raceRouter;