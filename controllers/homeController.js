const { query } = require("express-validator/check");
const { populate } = require("../models/post");
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
            })
            .populate({
                path: 'sharing',
                populate: [
                    {
                        path: 'user',
                        model: 'User'
                    }
                ]
            })
            .populate({
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
    getTrendingHashTags: async (req, res, next) => {
        // adjusting this value will adjust how much of an impact a post being initially created
        // has on the trend-score, as compared to the post being liked.
        // EX: with a value of 5 a post being initially created will have 5 times as much influence
        // on the trend-score as the post being liked.
        const postTrendScoreBaseline = 5;
        const trendingHashtagLimit = 10;
        let trendingHashTagData = await Post.aggregate([
            // start by calculating a 'trendScore' for each post
            // this is equal to the trend-score baseline for a post (defined above) plus the number of likes it received
            // divided by the difference between when the post was created and the current time
            {
                $project: {
                    _id: true,
                    hashtags: true,
                    trendScore: {
                        $divide: [
                            {$add: [{$size: "$likedBy"}, postTrendScoreBaseline]},
                            {$subtract: [new Date(), "$createdAt"]}
                        ]
                    }
                }
            },
            // sum the trend-scores for all usages of each hashtag across all posts
            {$unwind:"$hashtags"},
            {
                $group: {
                  _id: "$hashtags",
                  trendScore: { $sum: "$trendScore" }
                }
            },
            // sort by the largest trendScores
            { $sort: { "trendScore": -1 }},
            // limit to the top n
            { $limit: trendingHashtagLimit }
        ]).catch(e => {
            console.log(e);
        });
        res.locals.trendingHashtags = trendingHashTagData.map(data => data._id);
        next();
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
