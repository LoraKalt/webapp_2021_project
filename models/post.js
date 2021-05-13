"use strict";

const mongoose = require("mongoose");
const User = require("./user");
const Comment = require("./comment");

var postSchema = new mongoose.Schema(
    {
        postText: {
            type: String,
            required: true,
            min: [1, "Post cannot be empty"],
            max: [280, "Post exceeded max of 280 characters"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        }],
        hashtags: {
            type: [String]
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        sharing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: false
        }
    },
    {
        timestamps: true
    }
);

postSchema.methods.isLikedBy = function(id) {
    return this.likedBy && this.likedBy.map(objId => objId.toString()).includes(id);
}

postSchema.virtual("likesCount").get(function() {
    return this.likedBy.length;
});


module.exports = mongoose.model("Post", postSchema);
