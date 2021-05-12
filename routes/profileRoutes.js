const router = require("express").Router();
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

router.get("/", usersController.authRequired, commonController.paginationHandler, usersController.showProfile, usersController.showView);
router.get("/page/:pageNum", usersController.authRequired, commonController.paginationHandler, usersController.showProfile, usersController.showView);
router.get("/edit", usersController.authRequired, usersController.edit);
router.post("/update", usersController.validateUpdate, usersController.authRequired, usersController.update, commonController.redirectView);
router.get("/changepassword", usersController.authRequired, usersController.showChangePassword);
router.post("/changepassword", usersController.authRequired, usersController.changePassword, commonController.redirectView);
router.delete("/delete", usersController.delete, commonController.redirectView);

module.exports = router;