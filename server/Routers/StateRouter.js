const express = require("express");
const stateController = require("../Controllers/StateController");

const router = express.Router();

router.get("/get-states", stateController.getStates);
router.get("/get-cities/:state", stateController.getCitiesByState);

module.exports = router;
