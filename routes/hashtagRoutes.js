const router = require("express").Router();
const hashtagController = require("../controllers/hashtagController");

// Hashtags
router.get("/:hashtag", hashtagController.show, hashtagController.showView);

module.exports = router;