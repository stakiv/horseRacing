const express = require("express")
const ownerController = require("../controllers/owners");
const ownerRouter = express.Router();

ownerRouter.use("/owners", ownerController.find_owners);

module.exports = ownerRouter;