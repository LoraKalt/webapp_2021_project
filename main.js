//const mongoose = require("mongoose");
const express = require("express"), app = express();

const config = require("./config.json");

const homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
usersController = require("./controllers/usersController"),
layouts = require("express-ejs-layouts");

//mongoose.connect(config.databaseUrl, {useNewUrlParser: true});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", usersController.showLogin);

app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

//routes
app.get("/home", homeController.showHome);
app.get("/login", usersController.showLogin);
app.get("/signup", usersController.showSignup);

app.post("/signup", usersController.validate); //temporary, should be changed to createUser once form validation is implemented
app.post("/signin", usersController.findUser); // ^ Same except get user with matching email/password in database

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server running port ${app.get("port")}`)
});