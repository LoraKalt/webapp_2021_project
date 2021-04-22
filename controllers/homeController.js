const { query } = require("express-validator/check");
const Post = require("../models/post");
const User = require("../models/user");
module.exports = {
    index: (req, res, next) => {
        
        User.find().limit(20)
        .then(users => {
            let query = undefined;
            if(res.locals.loggedIn){
                let currentUser = res.locals.currentUser;
                query = {$or:[{ user: currentUser._id },{ user: { $in: currentUser.following }}]}
            }
            res.locals.users = users;
            Post.find(query).sort({createdAt: 'desc'})
            .populate({
                path: 'user',
            }).populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            }).then(posts => {
                res.locals.posts = posts;
                next();
            }).catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`);
            next(error);
        });
    },
    indexView: (req, res) => {
        res.render("home");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
}
