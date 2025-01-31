const express = require("express")

const deleteJockeyController = require("../controllers/deleteJockey");
const deleteJockeyRouter = express.Router();

deleteJockeyRouter.use("/deletejockey", deleteJockeyController.delete_jockey);

module.exports = deleteJockeyRouter;