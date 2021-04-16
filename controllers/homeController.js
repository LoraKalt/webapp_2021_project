const User = require("../models/user");
module.exports = {
    index: (req, res, next) => {
        User.find().limit(20)
        .then(users => {
            res.locals.users = users;
            next();
        })
        .catch(error => {
            console.log(`Error fetching subscribers: ${error.message}`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("home", {page_name: "home"});
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
}
