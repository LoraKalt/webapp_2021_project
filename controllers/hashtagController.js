const Post = require("../models/post");
const User = require("../models/user");
module.exports = {
    show: (req, res, next) => {
        let hashtag = req.params.hashtag;
        Post.find({ hashtags: { $in: [hashtag] }}).sort({createdAt: 'desc'}).populate({path: 'user'}).then(posts => {
            res.locals.posts = posts;
            next();
        })
    },
    showView: (req, res, next) => {
        res.render("hashtags/show");
    }
}