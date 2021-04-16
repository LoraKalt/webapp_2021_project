const passport = require("passport");

const User = require("../models/user");
const Posts = require("../models/post");
const e = require("express");

module.exports = {
    create: (req, res, next) => {
        if(res.locals.skip){
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
    },
    // TODO: Improve validation and add to all updates and creates
    validate: (req, res, next) => {
        req.sanitizeBody("email").trim();

        req.check("email", "Invalid email!").isEmail();
        req.check("password", "Password cannot be empty!").notEmpty();
        req.check("password", "Password and 'Confirm Password' must match!").equals("confirmpassword");

        req.sanitizeBody("email").trim();

        req.check("email", "Invalid email!").isEmail();
        // req.check("password", "Password cannot be empty!").notEmpy()
        //     .custom((val, {req}) => {
        //         if(val !== req.body.confirmpassword){
        //             throw new Error("passwords do not match");
        //         } else {
        //             return value;
        //         }
        //     });

    //     req.check("password", "Password and 'Confirm Password' must match!").equals("confirmpasswor
        req.check("username", "Username already exists!").custom((val, {req}) => {
            return new Promise((resolve, reject) => {
                User.findOne({username : req.body.username}, function(error, user){
                    if(err){
                        reject(new Error("Server Error"))
                    }
                    if(Boolean(user)) {
                        reject(new Error("Username already exists"));
                    } else {
                        resolve(true);
                    }
                })
            })
        });

        req.check("securityQ", "Security Question must be selected").notEmpty();
        req.check("location", "Location must be at least 20 characters long").isLength({max: 20});

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
            Posts.find().limit(5).populate({
                path: 'user',
                match: {username: user.username}
            }).then(posts => {
                res.locals.posts = posts;
                res.locals.displayUser = user;
                next();
            }).catch(error => {
                console.error(`Error getting posts for user: ${error.message}`);
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
                Posts.find().sort({'createdAt': 'desc'}).populate({
                    path: 'user',
                    match: {username: username}
                }).exec((error, posts) => {
                    if(error) {
                        console.error(`Error getting posts for user: ${error.message}`);
                        next(error);
                    }
                    else {
                        res.locals.posts = posts;
                        res.locals.displayUser = user;
                        next();
                    }
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