//const User = require("../models/user");

exports.createUser = (req, res) => {
    let newUser = new User({
        fname: req.body.txtFirstName,
        lname: req.body.txtLastName,
        username: req.body.txtUsername,
        email: req.body.txtEmail,
        passwordHash: null,
        securityQ: req.body.cbSecurity,
        securityQAnswer: req.body.txtAnswer,
        dateOfBirth: req.body.txtDoB,
        bio: req.body.txtareaBio,
        location: req.body.txtLocation,
        gender: req.body.gender
    });
    //todo: client-side validation -> just needs to check to see if validateForm = false. re-renders signup
    //todo: server-side validation
    newUser.save();
}

// View Renders
exports.showLogin = (req, res) => {
    res.render("login");
};

exports.showSignup = (req, res) => {
    res.render("signup");
};

//FOR TESTING PURPOSES ONLY (renders signup page with client-side validation errors) Delete when createUser does the checking
exports.validate = (req, res) => {
    res.render("signup");
};

//needs to find user in database, send error if not found
exports.findUser = (req, res) => {
    res.render("login");
};


