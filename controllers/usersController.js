const passport = require("passport");

const User = require("../models/user");

module.exports = {
    create: (req, res, next) => {
        let errMessage = "";
        let errorFields = [];

        let newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            securityQ: req.body.securityQ,
            securityQAnswer: req.body.securityQAnswer,
            dateOfBirth: req.body.dateOfBirth,
            bio: req.body.bio,
            location: req.body.location,
            gender: req.body.gender
        });

        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                if (err.name == 'ValidationError') {
                    for (field in err.errors) {
                        errMessage = errMessage + err.errors[field].message + '<br>';
                        errorFields.push(field);
                    }
                    res.locals.redirect = "/signup"
                    req.flash("error", errMessage);
                    next();
                }
                
            }
            else {
                res.locals.redirect = "/login";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").trim();

        req.check("email", "Invalid email!").isEmail();
        req.check("password", "Password cannot be empty!").notEmpty();
        req.check("password", "Password and 'Confirm Password' must match!").equals("confirmpassword");

        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join('<br>'));
                req.skip = true;
                res.local.redirect = "/users/signup";
                next();
            }
            else {
                next();
            }
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Login failed! Check you email and password!",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    handleRemember: (req, res, next) => {
        const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;
        if(req.body.rememberlogin){
            req.session.cookie.maxAge = TEN_DAYS;
        }
        else {
            req.session.cookie.expires = false;
        }
        next();
    },
    login: (req, res) => {
        res.render("users/login");
    },
    signUp: (req, res) => {
        res.render("users/signup");
    },
    show: (req, res, next) => {
        let username = req.params.username;
        User.findOne({username: username})
        .then(user => {
            res.locals.displayUser = user;
            next();
        })
        .catch(error => {
            console.error(`Error fetching user by username: ${error.message}`);
            next(error);
        });
    },
    showView: (req, res) => {
        res.render("users/show");
    }
}