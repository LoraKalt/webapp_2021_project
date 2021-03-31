const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: {type: String, required: [true, "'First Name' is required."]},
    lname: {type: String, required: [true, "'Last Name' is required."]},
    username: {type: String, required: [true, "'Username' is required."]},
    email: {type: String, required: [true, "'Email'  is required."]},
    password: {type: String, required: [true, "'Password' is required."]},
    securityQ: { type: String, enum: ['favColor', 'firstPet', 'firstCar'], required: [true, "'Security Question' is required."]},
    securityQAnswer: {type: String, required: [true, "'Security Answer' is required."]},
    dateOfBirth: {type: String, required: [true, "'Date of Birth' is required."]},
    bio: {type: String, required: false},
    location: {type: String, required: false},
    gender: { type: String, enum: ['male', 'female', 'other'], required: false}
});

module.exports = mongoose.model("User", userSchema);