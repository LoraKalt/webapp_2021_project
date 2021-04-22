"use strict";

const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentText: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema);