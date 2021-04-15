"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose;

var postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postText: {
            type: String,
            min: [0, "Post cannot be less than 0"],
            max: [280, "Post exceeeded max of 280 characters"]
        },
        multiMedia: {
            type: String,
            data: Buffer
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
                required: false
            }]
    },
    {
        timestamps: true
    }
);

var commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        mainPost: {
            type: Schema.Types.ObjectId,
            ref: "PostMsg"
        },
        message: {
            type: String,
            min: [0, "Post cannot be less than 0"],
            max: [280, "Post exceeeded max of 280 characters"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PostMsg", postSchema);
module.exports = mongoose.model("Comment", commentSchema);
