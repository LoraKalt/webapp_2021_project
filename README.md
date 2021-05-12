# CU-Denver Social Project
## Group:
+ Lora Kalthoff
+ Dax Hurley
---
## Description:

A simple social media site with posts, hashtags, trending hashtags, post comments, post sharing and profiles.

Login/signup more robust with authentication and validation. Users now have ability to post and view other user's posts. Cookies are implemented.

---
## Tasks:
Final:
- Lora : Notifications, Organization, 
- Dax : updating user model, CRUD for users, sessions and cookies, passport handling for login/sign up, express validator, posts (create, read, delete), general edits

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

7. Some login test users:

| Email | Password |
---| ---
| test@email.com | Aaa111 |
| john.doe@email.com | Abc123 |
| jane.smith@email.com | Zyx987 |
---

## Design Decisions and Assumptions - Assignment 4:
 - Database url is stored in a separate config.json for easier configuration and to open up automated configuration in the future.
 - View partial snippets used for dynamic navigation (hide menu options when not logged in).
 - There is no ability to post multimedia yet, but we hope to have it implemented in the final project.
 - Users can view their own page at '/profile', they can view other user's pages at '/users/{username}'
 - Users can create their account and edit
 - Pagination of posts was not implement in this version but will be implemented in final.

## Design Decisions + Future Plans - Overall Project:

### Posts

Users can make posts and delete their own posts.

### Technical
### Hashtags

Hashtags will function similar to most social media sites. Clicking on a hashtag will show posts by other users with that same hashtag. The posts shown will be sorted by number of likes and number of comments.

The trending hashtags in the sidebar wil be based off the most used hashtags (by post count) in the last 24 hours.

### Notifications

Users will receive notifications if another user follows them or if a user likes, comments on, or shares one of their posts.

### Following

Users will be able to follow other users, and then be able to see their posts on their homepage.

### Sharing

Users will be able to make posts in which they share other users posts.

### Comments

Comments will function as a simple chain under posts and be displayed in the order they are made.

While there is space to leave comments in the current version they are not yet functional.

### Messages

Users will be able to message each other, but only if they both follow one another.

### Forgot Password

Users will be able to recover their password using their security question. (In the real world we would also send an email, but that's complicated to set up)
### Who to Follow Box

Temporarily displays all users in database and links to their posts. This will be changed in final project to: 
This will show the top 3 users followed most often by users you follow.

## Implementation:
Website uses:
 [Bootstrap 4](https://getbootstrap.com/), html5, css3, javascript, node.js with express, MongoDB package Mongoose, express session, cookie parser, connect-flash express, express validator, and passport
