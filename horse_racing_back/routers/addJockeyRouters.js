const express = require("express")

const addJockeyController = require("../controllers/addJockey");
const addJockeyRouter = express.Router();

addJockeyRouter.use("/addjockey", addJockeyController.add_jockey);

module.exports = addJockeyRouter;