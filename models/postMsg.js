"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose;

var postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postDate: {
            type: Date
        },
        postText: {
            type: String,
            min: [0, "Post cannot be less than 0"],
            max: [280, "Post exceeeded max of 280 characters"]
        },
        multiMedia: {
            type: String,
            data: Buffer

        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PostMsg", postSchema);
