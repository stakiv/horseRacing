const express = require("express")

const deleteHorseController = require("../controllers/deleteHorse");
const deleteHorseRouter = express.Router();

deleteHorseRouter.use("/deletehorse", deleteHorseController.delete_horse);

module.exports = deleteHorseRouter;