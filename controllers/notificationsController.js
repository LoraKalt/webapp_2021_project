
const Post = require("../models/post");
const user = require("../models/user");
const User = require("../models/user");
module.exports = {
    index: (req, res, next) => {
        User.find({ following: { $in: [currentUser._id] }})
        .then(users => {
            res.locals.users = users;
            Post.find().sort({createdAt: 'desc'}) //To do, we'll sort this later by last checked on notifications
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
        res.render("notifications/index");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
}