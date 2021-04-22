const mongoose = require("mongoose");
const express = require("express"), app = express();

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const passport = require("passport");

const config = require("./config.json");

User = require("./models/user");
PostMsg = require("./models/post");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const commonController = require("./controllers/commonController");
const postController = require("./controllers/postController");
const hashtagController = require("./controllers/hashtagController");
const layouts = require("express-ejs-layouts");
const user = require("./models/user");

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.set('views', './views');

app.use(layouts);

app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use(connectFlash());

router = express.Router();

router.use(methodOverride("_method", { methods: ["POST", "GET"] }));

router.use(cookieParser("my_passcode"));
router.use(expressValidator());
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 3600000000,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.errorFields = [];
    next();
});


// Home
router.get("/", homeController.index, homeController.indexView);

// Users
router.get("/login", usersController.login);
router.get("/logout", usersController.logout, commonController.redirectView);
router.get("/signup", usersController.signUp);

router.post("/signup", usersController.validate, usersController.create, commonController.redirectView);
router.post("/login", usersController.authenticate, commonController.redirectView);

router.get("/users/:username", usersController.show, usersController.showView);
router.post("/users/:username/follow", usersController.authRequired, usersController.follow, commonController.redirectView);
router.post("/users/:username/unfollow", usersController.authRequired, usersController.unfollow, commonController.redirectView);
router.get("/profile", usersController.authRequired, usersController.showProfile, usersController.showView);
router.get("/profile/edit", usersController.authRequired, usersController.edit);
router.post("/profile/update", usersController.validateUpdate, usersController.authRequired, usersController.update, commonController.redirectView);
router.get("/profile/changepassword", usersController.authRequired, usersController.showChangePassword);
router.post("/profile/changepassword", usersController.authRequired, usersController.changePassword, commonController.redirectView);
router.delete("/profile/delete", usersController.delete, commonController.redirectView);

// Posts
router.post("/posts/create", usersController.authRequired, postController.validate, postController.create, commonController.redirectView);
router.get("/posts/:id", postController.show, postController.showView);
router.delete("/posts/:id/delete", usersController.authRequired, postController.delete, commonController.redirectView);
router.post("/posts/:id/like", usersController.authRequired, postController.like, commonController.redirectView);
router.post("/posts/:id/unlike", usersController.authRequired, postController.unlike, commonController.redirectView);
router.post("/posts/:id/comments", usersController.authRequired, postController.createComment, commonController.redirectView);
//router.delete("/posts/:id/comments/:commentId", usersController.authRequired, postController.deleteComment, commonController.redirectView);

// Hashtags
router.get("/hashtags/:hashtag", hashtagController.show, hashtagController.showView);

//error handling
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running port ${app.get("port")}`)
});