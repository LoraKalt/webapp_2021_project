"use strict";
const passport = require("passport");
const Post = require("../models/post")
const Comment = require("../models/comment");

const getPostParams = body => {
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
    showSharePostView: (req, res) => {
         Post.findById(req.params.id).populate('user')
        .then(post => {
            res.locals.sharedPost = post;
            res.render("posts/share");
            next();
        }
        ).catch(error => {
            console.error(`Error saving post: ${error.message}`);
            next(error);
        });
    },
    share: (req, res, next) => {
        res.locals.sharedPostId = req.params.id;
        next();
    },
    create: (req, res, next) =>{
        if(res.locals.skip){
            next();
        }
        else {
            let validPost = true;
            let user = res.locals.currentUser;
            let hashtagsRaw = req.body.postHashtags;
            let hashtags = hashtagsRaw.replace(/\s+/g, '').split(',');
            for(let i=0; i<hashtags.length; i++){
                if(!hashtags[i].startsWith('#')){
                    req.flash("error", "Post contains an invalid value in the hashtag field.");
                    validPost = false;
                }
                else {
                    hashtags[i] = hashtags[i].slice(1);
                }
            }
            if (validPost){
                let sharedPost = null;
                if(res.locals.sharedPostId){
                    sharedPost = res.locals.sharedPostId;
                }
                let newPost = new Post({
                    postText: req.body.postText,
                    user: user._id,
                    hashtags: hashtags,
                    sharing: sharedPost
                });
                Post.create(newPost)
                .then(post => {
                    if(sharedPost){
                        res.locals.redirect = "/";
                    }
                    else {
                        res.locals.redirect = req.get('referer');
                    }
                    next();
                })
                .catch(error => {
                    console.error(`Error saving post: ${error.message}`);
                    next(error);
                });
            }
            else {
                res.locals.redirect = req.get('referer');
                next();
            }
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
                res.locals.redirect = req.get('referer');
                next();
            }
            else {
                next();
            }
        });
    },
    like: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        let postId = req.params.id;
        Post.findByIdAndUpdate(postId, { $push: {likedBy: currentUser._id} }).then(post => {
            res.locals.redirect = req.get('referer');
            next();
        }).catch(error => {
            console.log(`Error deleting post by ID: ${error.message}`);
            next();
        });
    },
    unlike: (req, res, next) =>{
        let currentUser = res.locals.currentUser;
        let postId = req.params.id;
        Post.findByIdAndUpdate(postId, { $pull: {likedBy: currentUser._id} }).then(post => {
            res.locals.redirect = req.get('referer');
            next();
        }).catch(error => {
            console.log(`Error deleting post by ID: ${error.message}`);
            next();
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
                // #TODO: Delete comments related to a post when deleting the post.
                Post.findByIdAndDelete(postId)
                .then(() => {
                    res.locals.redirect = req.get('referer');
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
    },
    createComment: (req, res, next) => {
        let postId = req.params.id;
        let currentUser = res.locals.currentUser;
        let newComment = Comment({
            user: currentUser._id,
            commentText: req.body.commentText
        });
        Comment.create(newComment).then(() => {
            Post.findByIdAndUpdate(postId, { $push: {comments: newComment._id} }).then(post => {
                res.locals.redirect = req.get('referer');
                next();
            }).catch(error => {
                console.log(`Error adding comment to post: ${error.message}`);
                next();
            });
        }).catch(error => {
            console.log(`Error creating comment: ${error.message}`);
            next();
        });
    }
};


