"use strict";

const mongoose = require("mongoose"),
    User = require("./models/user"),
    PostMsg = require("./models/postMsg");

mongoose.connect("mongodb://localhost:27017/cu_dever_social", 
    { useNewUrlParser: true });
mongoose.connection;

var users = [
    {
        fname: "John",
        lname: "Doe",
        username: "Doeman",
        email: "john.doe@email.com",
        password: "Abc123",
        securityQ: "favColor",
        securityQAnswer: "Green",
        dateOfBirth: "1995-05-05",
        bio: "Just an average guy",
        location: "Denver",
        gender: "male",
        posts: []
    },
    {
        fname: "Jane",
        lname: "Smith",
        username: "Smithy",
        email: "jane.smith@email.com",
        password: "Zyx987",
        securityQ: "firstPet",
        securityQAnswer: "Spot",
        dateOfBirth: "2000-01-01",
        bio: "Biology Major",
        location: "Littleton",
        gender: "female",
        posts: []
    },
    {
        fname: "Tester",
        lname: "McTester",
        username: "TestUser",
        email: "test@email.com",
        password: "Aaa111",
        securityQ: "firstCar",
        securityQAnswer: "TESTla",
        dateOfBirth: "1980-12-12",
        bio: "Just a testing user",
        location: "On the Internet",
        gender: "other",
        posts: []
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty");
    });

var commands = [];

users.forEach(u => {
    commands.push(
        User.create({
            fname: u.fname,
            lname: u.lname,
            username: u.username,
            email: u.email,
            password: u.password,
            securityQ: u.securityQ,
            securityQAnswer: u.securityQAnswer,
            dateOfBirth: u.dateOfBirth,
            bio: u.bio,
            location: u.location,
            gender: u.gender,
            posts: u.posts
        })
    );
});


Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
