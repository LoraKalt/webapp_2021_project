const router = require("express").Router();
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

router.get("/", usersController.signUp);
router.post("/", usersController.validate, usersController.create, commonController.redirectView);

module.exports = router;