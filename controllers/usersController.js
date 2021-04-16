const passport = require("passport");

const User = require("../models/user");
const Posts = require("../models/post");
const e = require("express");

module.exports = {
    create: (req, res, next) => {
        console.log("Made it to create!");
        if(res.locals.skip){
            console.log("Made it to skip!");
            next();
        }
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
                        errMessage = errMessage + err.errors[field].message + ' ';
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
    update: (req, res, next) => {
        if(res.locals.skip){
            next();
        }
        else {
            let userId = res.locals.currentUser._id;
            let userParams = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                securityQ: req.body.securityQ,
                securityQAnswer: req.body.securityQAnswer,
                dateOfBirth: req.body.dateOfBirth,
                bio: req.body.bio,
                location: req.body.location,
                gender: req.body.gender
            }
            User.findByIdAndUpdate(userId, userParams)
            .then(user => {
                res.locals.redirect = "/profile";
                next();
            })
            .catch(error => {
                console.error(`Error fetching user by ID: ${error.message}`);
                res.locals.redirect = "/profile/edit";
                next(error);
            });
        }
    },
    validateChangePass: (req, res, next) => {
        req.check("oldpassword", "'Old Password' cannot be empty!").notEmpty();
        req.check("newpassword", "'New Password' and 'Confirm New Password' must match!").equals(req.body.confirmpassword);
    },
    validate: (req, res, next) => {
        req.check("password", "Password cannot be empty!").notEmpty();
        req.check("password", "Password and 'Confirm Password' must match!").equals(req.body.confirmpassword);

        req.check("email", "Invalid email!").notEmpty().isEmail();

        req.check("dateOfBirth", "Date of birth must exist.").notEmpty();

        req.check("securityQ", "Please select a security question.").notEmpty().isIn(['favColor', 'firstPet', 'firstCar']);
        req.check("securityQAnswer", "Security question answer can't be empty!").notEmpty();
        req.check("gender", "Invalid value for Gender.").isIn(['male', 'female', 'other', undefined]);
        req.check("location", "Location must be at most 50 characters long").isLength({max: 50});

        req.getValidationResult().then(error => {
            console.log("Made it to error checks!");
            if(!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(' '));
                res.locals.skip = true;
                res.locals.redirect = "/signup";
                next();
            }
            else {
                next();
            }
        }).catch(error => {
            console.log(`Error validating: ${error}`);
            next(error);
        });
    },
    validateUpdate: (req, res, next) => {
        req.check("email", "Invalid email!").notEmpty().isEmail();

        req.check("dateOfBirth", "Date of birth must exist.").notEmpty();

        req.check("securityQ", "Please select a security question.").notEmpty().isIn(['favColor', 'firstPet', 'firstCar']);
        req.check("securityQAnswer", "Security question answer can't be empty!").notEmpty();
        req.check("gender", "Invalid value for Gender.").isIn(['male', 'female', 'other', undefined]);
        req.check("location", "Location must be at most 50 characters long").isLength({max: 50});

        req.getValidationResult().then(error => {
            console.log("Made it to error checks!");
            if(!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(' '));
                res.locals.skip = true;
                res.locals.redirect = "/profile/edit";
                next();
            }
            else {
                next();
            }
        }).catch(error => {
            console.log(`Error validating: ${error}`);
            next(error);
        });
    },
    changePassword: (req, res, next) => {
        req.body.email = res.locals.currentUser.email;
        let user = res.locals.currentUser;
        let newPassword = req.body.newpassword;
        let oldPassword = req.body.oldpassword;
        User.findById(user._id).then(foundUser => {
            user.changePassword(oldPassword, newPassword).then(user => {
                req.flash("success", "Password changed!");
                res.locals.redirect = "/profile";
                next();
            })
            .catch(error => {
                console.error(`Error changing user's password: ${error}`);
                req.flash("error", `Error changing password: ${error.message}`);
                res.locals.redirect = "/profile/changepassword";
                next();
            });
        }).catch(error => {
            console.error(`Error changing user's password: ${error}`);
            req.flash("error", `Error changing password: ${error.message}`);
            res.locals.redirect = "/profile/changepassword";
            next();
        });
    },
    showChangePassword: (req, res, next) => {
        res.render("users/changepassword");
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Login failed! Check you email and password!",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    login: (req, res) => {
        res.render("users/login");
    },
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    signUp: (req, res) => {
        res.render("users/new");
    },
    showProfile: (req, res, next) => {
        let user = res.locals.currentUser;
        if(!user){
            console.log("User not found");
            res.render("error");
        }
        else {
            Posts.find({user: user._id})
            .populate({path: 'user',})
            .sort({'createdAt': 'desc'}).then(posts => {
                res.locals.posts = posts;
                res.locals.displayUser = user;
                next();
            }).catch(error => {
                console.log(`Error fetching subscribers: ${error.message}`);
                next(error);
            });
        }
    },
    show: (req, res, next) => {
        let username = req.params.username;
        User.findOne({username: username})
        .then(user => {
            if(!user){
                console.log("User not found");
                res.render("error");
            }
            else {
                Posts.find({user: user._id})
                .populate({path: 'user',})
                .sort({'createdAt': 'desc'}).then(posts => {
                    res.locals.posts = posts;
                    res.locals.displayUser = user;
                    next();
                }).catch(error => {
                    console.log(`Error fetching subscribers: ${error.message}`);
                    next(error);
                });
            }
        })
        .catch(error => {
            console.error(`Error fetching user by username: ${error.message}`);
            next(error);
        });
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res) => {
        res.render("users/edit");
    },
    delete: (req, res, next) => {
        let user = res.locals.currentUser;
        // Delete the user's posts
        Posts.find().populate({
            path: 'user',
            match: {username: user.username}
        }).remove().exec((error, posts) => {
            if(error) {
                console.error(`Error deleting posts for user: ${error.message}`);
                res.locals.redirect = "/";
                next(error);
            }
            else {
                // Delete the user
                User.findByIdAndDelete(user._id)
                .then(() => {
                    res.locals.redirect = "/";
                    req.flash("success", "User deleted.");
                    next();
                })
                .catch(error => {
                    console.log(`Error deleting user: ${error.message}`);
                    res.locals.redirect = "/";
                    req.flash("success", `Error deleting user: ${error.message}`);
                    next();
                });
            }
        });
        // TODO: Once comments are implemented this will need to delete comments as well.
    },
    authRequired: (req, res, next) => {
        if(res.locals.loggedIn){
            next();
        }
        else {
            req.flash("error", "You don't have permission to do that.");
            res.locals.skip = true;
            res.redirect("/");
        }
    }
}