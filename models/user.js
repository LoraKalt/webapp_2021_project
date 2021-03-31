const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    securityQ: { type: String, enum: ['favColor', 'firstPet', 'firstCar'], required: true},
    securityQAnswer: {type: String, required: true},
    dateOfBirth: {type: String, required: true,
    bio: {type: String, required: false},
    location: {type: String, required: false},
    gender: { type: String, enum: ['male', 'female', 'other'], required: false}
}});

module.exports = mongoose.model("User", userSchema);