const router = require("express").Router();
const homeController = require("../controllers/homeController");
const commonController = require("../controllers/commonController");

router.get("/page/:pageNum", commonController.paginationHandler, homeController.getTrendingHashTags, homeController.index, homeController.indexView);
router.get("/", commonController.paginationHandler, homeController.getTrendingHashTags, homeController.index, homeController.indexView);

module.exports = router;