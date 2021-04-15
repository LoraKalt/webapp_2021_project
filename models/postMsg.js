"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose;

var postSchema = new Schema(
    {
        postText: {
            type: String,
            min: [1, "Post cannot be empty"],
            max: [280, "Post exceeded max of 280 characters"]
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
