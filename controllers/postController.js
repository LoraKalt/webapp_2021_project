"use strict";
const passport = require("passport");
const Post = require("../models/post"),
    getPostParams = body => {
        return {
            postText: body.postText,
        };
    };

module.exports = {
    index: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
                console.log(`Error fetching posts: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("posts/index");
    },
    create: (req, res, next) =>{
        if(res.locals.skip){
            next();
        }
        else {
            let user = res.locals.currentUser;
            let newPost = new Post({
                postText: req.body.postText,
                user: user._id
            });
            Post.create(newPost)
            .then(course => {
                res.locals.redirect = "/profile";
                next();
            })
            .catch(error => {
                console.error(`Error saving post: ${error.message}`);
                next(error);
            });
        }
    },
    show: (req, res, next) => {
        let postId = req.params.id;
        Post.findById(postId)
            .then(post => {
                res.locals.post = post;
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("posts/show");
    },

    validate: (req, res, next) => {
        req.check("postText", "Post must be between 1 and 280 characters").isLength({min: 1, max: 280});
        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(' '));
                res.locals.skip = true;
                res.locals.redirect = "/profile";
                next();
            }
            else {
                next();
            }
        });
    },
    delete: (req, res, next) => {
        let user = res.locals.currentUser;
        let postId = req.params.id;
        Post.findById(postId).populate({path: 'user'}).then(post => {
            if(post.user._id.toString() != user._id.toString()){
                req.flash("error", "You don't have permission to do that.");
                res.locals.skip = true;
                res.redirect("/");
            }
            else {
                Post.findByIdAndDelete(postId)
                .then(() => {
                    res.locals.redirect = "/profile";
                    next();
                })
                .catch(error => {
                    console.log(`Error deleting post by ID: ${error.message}`);
                    next();
                });
            }
        }).catch(error => {
            console.log(`Error finding post: ${message}`);
        })
    }
};


