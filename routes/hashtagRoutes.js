const router = require("express").Router();
const hashtagController = require("../controllers/hashtagController");
const commonController = require("../controllers/commonController");

router.get("/:hashtag", commonController.paginationHandler, hashtagController.show, hashtagController.showView);
router.get("/:hashtag/page/:pageNum", commonController.paginationHandler, hashtagController.show, hashtagController.showView);

module.exports = router;