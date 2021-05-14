const Post = require("../models/post");
const User = require("../models/user");
module.exports = {
    show: (req, res, next) => {
        let hashtag = req.params.hashtag;
        Post.find({ hashtags: { $in: [hashtag] }})
        .limit(res.locals.itemCount)
        .skip(res.locals.skipCount)
        .sort({createdAt: 'desc'})
        .populate({path: 'user'}).then(posts => {
            res.locals.posts = posts;
            res.locals.hashtag = hashtag;
            next();
        })
    },
    showView: (req, res, next) => {
        res.render("hashtags/show");
    }
}