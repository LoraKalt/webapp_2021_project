const User = require("../models/user");

exports.createUser = (req, res) => {
    let errMessage = "";
    let result;

    if(req.body.password != req.body.confirmpassword){
        errMessage = "'Password' and 'Confirm Password' must match.";
        res.render("signup", {error: errMessage});
    }

    if(req.body.username){
        result = User.findOne({username: req.body.username}).exec();
        if(result){
            errMessage = 'A user with that username already exists, please pick a different one.';
            res.render("signup", {error: errMessage});
        }
    }

    if(req.body.email){
        result = User.findOne({email: req.body.email}).exec();
        if(result){
            errMessage = 'A user with that email already exists. Did you mean to <a href="/signin">sign in</a>?';
            res.render("signup", {error: errMessage});
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
    //todo: client-side validation -> just needs to check to see if validateForm = false. re-renders signup
    //todo: server-side validation
    newUser.save((err, user) => {
        if(err){
            if(err.name == 'ValidationError'){
                for (field in err.errors) {
                    errMessage = errMessage + err.errors[field].message + '<br>'; 
                }
            }
            res.render("signup", {error: errMessage});
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


