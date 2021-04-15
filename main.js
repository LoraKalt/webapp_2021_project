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

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const commonController = require("./controllers/commonController");
const postController = require("./controllers/postController");
const layouts = require("express-ejs-layouts");

mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});

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

router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router.use(cookieParser("my_passcode"));
router.use(expressValidator());
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 36000000
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
router.get("/", homeController.showHome);

// Users
router.get("/login", usersController.login);
router.get("/logout", usersController.logout, commonController.redirectView);
router.get("/signup", usersController.signUp);

router.post("/signup", usersController.create, commonController.redirectView);
router.post(
    "/login",
    usersController.authenticate,
    usersController.handleRemember,
    commonController.redirectView
);

router.get("/users/:username", usersController.show, usersController.showView);
router.get("/profile", usersController.authRequired, usersController.showProfile, usersController.showView);
router.get("/profile/edit", usersController.authRequired, usersController.edit);
router.post("/profile/update", usersController.authRequired, usersController.update, commonController.redirectView);
router.get("/profile/changepassword", usersController.authRequired, usersController.showChangePassword);
router.post("/profile/changepassword", usersController.authRequired, usersController.changePassword, commonController.redirectView);
// TODO: Add user deletion.


//TODO: posting note: none of them are working yet, hence commented out
// router.get("/post", postController.index, postController.indexView);
// router.get("/post/new", postController.new);
// router.post("/post/create",postController.create, postController.redirectView);

// router.get("/post/:id", postController.show, postController.showView);
// router.delete("/post/:id/delete", postController.delete, postController.redirectView);


//error handling
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running port ${app.get("port")}`)
});