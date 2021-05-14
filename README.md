# CU-Denver Social Project
## Group:
+ Lora Kalthoff
+ Dax Hurley

---

Website: [cu-denver-social](https://cu-denver-social.herokuapp.com/)

Video Demo: [Youtube](https://www.youtube.com/watch?v=fAGVmWUuL54)

---
## Description:

CU Denver Social is a social media site that allows users to keep in touch with their peers at CU Denver (although you don't have to be a student to join). 

There, you can make posts, follow other users, like and share other's posts and reply. 

---
## Tasks:
Final:
- Lora : Organization, Client-Side validation, Layouts
- Dax : Posts, Comments, Sharing Posts, Hashtags, User Profiles

---
## Final - Running Locally:

1. Make sure MongoBD and node.js are installed on your computer.
    - You can download MongoDB from [the project's official download page](https://www.mongodb.com/try/download/community).
2. Clone the repo or download. If folder "node_modules" is not included, in command prompt, type:
    >npm install
3. You also need to have nodemon installed to run the program, install it with:
    >npm install -g nodemon
3. The web app should connect to local mongoDB automatically, but if you need to change the url or port edit 'config.json' to modify the database url.
4. To start the webapp, in the command prompt type:
    >npm start
5. In a browser, go to http://localhost:3000/
6. To fill up database with filler users, type
    >node seed

7. Some login test users from seed.js 

(for local testing only. For security reasons, passwords are
different on the actual site):

| Email | Password |
---| ---
| test@email.com | Aaa111 |
| john.doe@email.com | Abc123 |
| jane.smith@email.com | Zyx987 |
---

## Design Decisions and Assumptions - Final:
 - When not logged in, users can see other users posts and profiles, but can't comment, post, like or share.
 - Users are allowed to post as many comments they want on other user's posts.
 - In editing profile, changing your email will log you out and require you to log back in (as your session with old email has expired).

## Design Decisions - Final:

### Home page
Visitors will see all the latest posts by users on the website however they will not be able to do any interaction such as post, comment, like, or share until they either log in or sign up.

Logged in users will be able to see all the posts from other users that they follow (or not if they do not follow anyone) and are able to comment, like, and share on other user's posts as well as make their own post.

Logged in users are also treated to a different navigation menu that navigates to their profile, change user settings and log out.

Both visitors and logged in users are able to see the trending hashtags and all the users on the service. However, only logged in users are able to follow users.

### Sign Up
Visiting users will see a link to the sign up page where they fill out a form asking for their name, username handle, email, password (with confirmation), security question, their date of birth, and optional fields such as gender, bio, and location.
Successfully signing in will direct the newly registered user to the login page.

### Log in
Users can login via the login page where they provide their email and their password. If the credentials are correct, they are redirected to the home page where they can begin interacting with the site. 

### Edit Profile
Users can edit their profile by either clicking on their profile and then on edit or they can click on user settings. They can edit any field they want except for username as that is their unique identifier.

They can change their password, but must do so through a separate page.

### Delete User
Likewise, the logged in user can also delete their account if they so desired, which in return deletes all their posts and any interaction they had on the site (comments, follows, shares).

### Posts
Logged in users can create and delete posts whether they are on the homepage or their personal profile. They can also include hashtags on their post. If the message is blank or exceeds the character limit, they won't be able to post.

### Hashtags
Hashtags function similar to most social media sites. Clicking on a hashtag show posts by other users with that same hashtag. The posts shown be sorted by number of likes and number of comments.

The trending hashtags is based off a score involving a combination of the age of the posts that used a hashtag and how many likes the the posts have.

### Following
Users are able to follow other users and doing so will let them see all of their posts on the homepage. Likewise, they can also unfollow any user they are currently following. Users are not allowed to follow themselves.

### Sharing
Users are are able to also share both their own post and other user's posts similar to twitter.

### Comments
Comments are a simple chain under posts and be displayed in the order they are made. Both logged in user and other users can comment on any post. Like posts, the message cannot be blank or exceed the character limit of 280 characters.

### Who to Follow Box
Displays the users using the site and gives the logged in user an option to follow or unfollow them.

### Technical
Navigating to a url route that does not exist will display a 404 message to let users know.

## Implementation:
Website uses:
 [Bootstrap 4](https://getbootstrap.com/), html5, css3, javascript, node.js with express, MongoDB package Mongoose, express session, cookie parser, connect-flash express, express validator, and passport.
 
 Hosted on [Heroku](https://www.heroku.com/)


