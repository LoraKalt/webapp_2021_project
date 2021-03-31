const User = require("../models/user");

exports.createUser = (req, res) => {
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
    //todo: client-side validation -> just needs to check to see if validateForm = false. re-renders signup
    //todo: server-side validation
    newUser.save((err, user) => {
        if(err){
            console.log(err);
        }
        else {
            res.render("login");
        }
    });
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


