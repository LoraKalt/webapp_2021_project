"use strict";

const mongoose = require("mongoose"),
    User = require("./models/user");
const Post = require("./models/post");

mongoose.connect("mongodb://localhost:27017/cu_dever_social", 
    { useNewUrlParser: true });
mongoose.connection;

var users = [
    {
        fname: "John",
        lname: "Doe",
        username: "doeman",
        email: "john.doe@email.com",
        password: "Abc123",
        securityQ: "favColor",
        securityQAnswer: "Green",
        dateOfBirth: "1995-05-05",
        bio: "Just an average guy",
        location: "Denver",
        gender: "male"
    },
    {
        fname: "Jane",
        lname: "Smith",
        username: "smithy",
        email: "jane.smith@email.com",
        password: "Zyx987",
        securityQ: "firstPet",
        securityQAnswer: "Spot",
        dateOfBirth: "2000-01-01",
        bio: "Biology Major",
        location: "Littleton",
        gender: "female"
    },
    {
        fname: "Tester",
        lname: "McTester",
        username: "testuser",
        email: "test@email.com",
        password: "Aaa111",
        securityQ: "firstCar",
        securityQAnswer: "TESTla",
        dateOfBirth: "1980-12-12",
        bio: "Just a testing user",
        location: "On the Internet",
        gender: "other"
    }
];


User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty");
    }).catch(error => {
        console.log(error);
    });

var i = 0;
users.forEach(u => {
    console.log(i);
    let newUser = new User({
        fname: u.fname,
        lname: u.lname,
        username: u.username,
        email: u.email,
        securityQ: u.securityQ,
        securityQAnswer: u.securityQAnswer,
        dateOfBirth: u.dateOfBirth,
        bio: u.bio,
        location: u.location,
        gender: u.gender
    });
    User.register(newUser, u.password, (err, user) => {
        if (err) {
            if (err.name == 'ValidationError') {
                console.log(err.message);
            }
        }
        else {
            let newPost = new Post({
                postText: "How is everyone today?",
                user: user._id
            });
            Post.create(newPost);
            console.log(`User created: ${newUser.username}`);
            i++;
            if(i === users.length){
                process.exit(0);
            }
        }
    });
});

//mongoose.connection.close();

// Promise.all(commands)
//     .then(r => {
//         console.log(JSON.stringify(r));
//         mongoose.connection.close();
//     })
//     .catch(error => {
//         console.log(`ERROR: ${error}`);
//     });
