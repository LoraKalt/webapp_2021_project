const router = require("express").Router();
const postController = require("../controllers/postController"); 
const usersController = require("../controllers/usersController");
const commonController = require("../controllers/commonController");

// Posts
router.post("/create", usersController.authRequired, postController.validate, postController.create, commonController.redirectView);
router.get("/:id", postController.show, postController.showView);
router.delete("/:id/delete", usersController.authRequired, postController.delete, commonController.redirectView);
router.post("/:id/like", usersController.authRequired, postController.like, commonController.redirectView);
router.post("/:id/unlike", usersController.authRequired, postController.unlike, commonController.redirectView);
router.post("/:id/comments", usersController.authRequired, postController.createComment, commonController.redirectView);
router.get("/:id/share", usersController.authRequired, postController.showSharePostView);
router.post("/:id/share", usersController.authRequired, postController.share, postController.validate, postController.create, commonController.redirectView);
router.delete("/posts/:id/comments/:commentId/delete", usersController.authRequired, postController.deleteComment, commonController.redirectView);

module.exports = router;