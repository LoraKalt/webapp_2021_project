const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getTrendingHashTags, homeController.index, homeController.indexView);

module.exports = router;