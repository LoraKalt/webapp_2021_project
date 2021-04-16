"use strict";

const Post = require("../models/post"),
    getPostParams = body => {
        return {
            postText: body.postText,
            //multiMedia: body.multiMedia,
            //comments: body.comments
        };
    };
//Still need to customize and also have some image handling
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

    new: (req, res) => {
        res.render("posts/index"); //assuming users create posts on their "home" page
    },

    create: (req, res, next) =>{
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
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
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
        res.render("posts/show"); //TODO: Change
    },

    //   edit: (req, res, next) => {
    //     let postId = req.params.id;
    //     Post.findById(postId)
    //       .then(post => {
    //         res.render("posts/edit", {
    //           post: post
    //         });
    //       })
    //       .catch(error => {
    //         console.log(`Error fetching post by ID: ${error.message}`);
    //         next(error);
    //       });
    //   },

    //   update: (req, res, next) => {
    //     let postId = req.params.id,
    //       postParams = getPostParams(req.body);

    //     Post.findByIdAndUpdate(postId, {
    //       $set: postParams
    //     })
    //       .then(post => {
    //         res.locals.redirect = `/posts/${postId}`;
    //         res.locals.post = post;
    //         next();
    //       })
    //       .catch(error => {
    //         console.log(`Error updating post by ID: ${error.message}`);
    //         next(error);
    //       });
    //   },

    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/posts"; //TODO: Change
                next();
            })
            .catch(error => {
                console.log(`Error deleting post by ID: ${error.message}`);
                next();
            });
    }
};


