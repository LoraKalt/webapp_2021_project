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
        gender: "male",
        posts: [
            {
                text: "Yo, it's Jon Doe.",
                hashtags: ["yo", "idkwhattoputhere"]
            }
        ]
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
        gender: "female",
        posts: [
            {
                text: "Hi there! I'm Jane! Excited to get to know you all!",
                hashtags: ["lorem", "ipsum"]
            }
        ]
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
        gender: "other",
        posts: [
            {
                text: "Just testing.",
                hashtags: ["lorem", "ipsum"]
            }
        ]
    }
];

const genData = async (callback) => {
    try {
        let userDeleteResp = await User.deleteMany().exec();
        console.log("User data is empty");
        let postDeleteResp = await Post.deleteMany().exec();
        console.log("Posts deleted");
        for (const u of users) {
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
            let user = await User.register(newUser, u.password);
            for (const post of u.posts) {
                let newPost = new Post({
                    postText: post.text,
                    user: user._id,
                    hashtags: post.hashtags
                });
                let postResp = await Post.create(newPost);
            }
            console.log(`User created: ${u.username}`);
        }
    } catch (error) {
        console.log(error);
    }
}

genData().then(() => process.exit(0)).catch(error => console.log(error));