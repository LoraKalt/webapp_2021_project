const router = require("express").Router();
const usersRoutes = require("./usersRoutes");
const profileRoutes = require("./profileRoutes");
const postRoutes = require("./postRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const logoutRoutes = require("./logoutRoutes");
const homeRoutes = require("./homeRoutes");
const errorRoutes = require("./errorRoutes");


router.use("/users", usersRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/logout", logoutRoutes);
router.use("/profile", profileRoutes);
router.use("/posts", postRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;