// exports.showHome = (req, res) => {
//     res.render("home", {page_name: "home"});
// };

const User = require("../models/user");
module.exports = {
    index: (req, res, next) => {
        User.find()
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
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    showView: (req, res) => {
        res.render("home/show"); //renders other users posts
    }
}
