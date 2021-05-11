const router = require("express").Router();
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

router.get("/", usersController.logout, commonController.redirectView);

module.exports = router;