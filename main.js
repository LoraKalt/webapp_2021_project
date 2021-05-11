const mongoose = require("mongoose");
const express = require("express"), app = express();
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const passport = require("passport");

const config = require("./config.json");

User = require("./models/user");
PostMsg = require("./models/post");


//const notificationsController = require("./controllers/notificationsController")
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

//router = express.Router();

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(cookieParser("my_passcode"));
app.use(expressValidator());
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 3600000000,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.errorFields = [];
    next();
});

//notifications
//router.get("/notifications", notificationsController.index, notificationsController.indexView);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running port ${app.get("port")}`)
});