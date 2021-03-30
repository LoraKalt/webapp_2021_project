const User = require("../models/user");

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
    newUser.save();
}