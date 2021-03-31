const User = require("../models/user");

// User creation
exports.createUser = async (req, res) => {
    let errMessage = "";
    let result;

    if (req.body.password != req.body.confirmpassword) {
        errMessage = "'Password' and 'Confirm Password' must match.";
        res.render("signup", { error: errMessage });
    }

    if (req.body.username) {
        result = await User.findOne({ username: req.body.username }).exec().then(res => {
            if (res) {
                errMessage = 'A user with that username already exists, please pick a different one.';
                res.render("signup", { error: errMessage });
                return;
            }
        });
    }

    if (req.body.email) {
        result = await User.findOne({ email: req.body.email }).exec();
        if (result) {
            errMessage = 'A user with that email already exists. Did you mean to <a href="/login">sign in</a>?';
            res.render("signup", { error: errMessage });
            return;
        }
    }

    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        securityQ: req.body.securityQ,
        securityQAnswer: req.body.securityQAnswer,
        dateOfBirth: req.body.dateOfBirth,
        bio: req.body.bio,
        location: req.body.location,
        gender: req.body.gender
    });

    newUser.save((err, user) => {
        if (err) {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    errMessage = errMessage + err.errors[field].message + '<br>';
                }
            }
            res.render("signup", { error: errMessage });
        }
        else {
            res.render("login");
        }
    });
}

// Login
exports.login = async (req, res) => {
    let result = await User.findOne({ email: req.body.email }).exec();
    if (!result) {
        errMessage = 'Incorrect email.';
        res.render("login", { error: errMessage });
    }
    else if (result.password == req.body.password) {
        res.render("home");
    }
    else {
        errMessage = 'Wrong password.';
        res.render("login", { error: errMessage });
    }
}

// View Renders
exports.showLogin = (req, res) => {
    res.render("login");
};

exports.showSignup = (req, res) => {
    res.render("signup");
};
