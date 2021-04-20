"use strict";

const mongoose = require("mongoose");
const { use } = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
    {
        fname: {type: String, required: [true, "'First Name' is required."]},
        lname: {type: String, required: [true, "'Last Name' is required."]},
        username: {type: String, required: [true, "'Username' is required."], index: { unique: true }},
        email: {type: String, required: [true, "'Email'  is required."]},
        securityQ: { type: String, enum: ['favColor', 'firstPet', 'firstCar'], required: [true, "'Security Question' is required."]},
        securityQAnswer: {type: String, required: [true, "'Security Answer' is required."]},
        dateOfBirth: {type: String, required: [true, "'Date of Birth' is required."]},
        bio: {type: String, required: false},
        location: {type: String, required: false},
        gender: { type: String, enum: ['male', 'female', 'other'], required: false},
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: true
    }
);

userSchema.methods.isFollowing = function(id) {
    return this.following && this.following.map(objId => objId.toString()).includes(id);
}

userSchema.virtual("fullName").get(function() {
    return `${this.fname} ${this.lname}`
});

userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user",
    justOne: false
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);