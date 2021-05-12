const router = require("express").Router();
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

router.get("/:username/page/:pageNum", commonController.paginationHandler, usersController.show, usersController.showView);
router.get("/:username", commonController.paginationHandler, usersController.show, usersController.showView);
router.post("/:username/follow", usersController.authRequired, usersController.follow, commonController.redirectView);
router.post("/:username/unfollow", usersController.authRequired, usersController.unfollow, commonController.redirectView);

module.exports = router;