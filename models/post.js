"use strict";

const mongoose = require("mongoose");
const User = require("./user");

var postSchema = new mongoose.Schema(
    {
        postText: {
            type: String,
            required: true,
            min: [1, "Post cannot be empty"],
            max: [280, "Post exceeded max of 280 characters"]
        },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Post", postSchema);
