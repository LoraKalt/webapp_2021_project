const express = require("express"), app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", (req, res) => {
    res.send("Web App Dev Assignment 3. Only /home view is finished"); //change this later
});

app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

//routes
app.get("/home", homeController.showHome);

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);



app.listen(app.get("port"), () => {
    console.log(`Server running port ${app.get("port")}`)
});