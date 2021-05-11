const router = require("express").Router();
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

// Users
router.get("/", usersController.login);
// router.get("/logout", usersController.logout, commonController.redirectView);
// router.get("/signup", usersController.signUp);

// router.post("/signup", usersController.validate, usersController.create, commonController.redirectView);
router.post("/", usersController.authenticate, commonController.redirectView);


module.exports = router;