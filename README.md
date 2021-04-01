# CU-Denver Social Project (working title)
## Group:
+ Lora Kalthoff
+ Dax Hurley
---
## Description:


---
## Tasks:
Assignment 2:
- Lora : main.js, views, seed.js, homeController, errorController
- Dax : models, userController, db, server-side errors, 

---
## Assignment 3 - Usage:

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

## Design Decisions and Assumptions - Assignment 3:
 - Database url is stored in a separate config.json for easier configuration and to open up automated configuration in the future.
 - View partial snippets used for dynamic navigation (hide menu options when not logged in).
 - No server-side password strength validation or password hashing for now - we plan to add both of these down the road!
 - The root path ('/') will render login, and '/home' will render the homepage.

## Design Decisions + Future Plans - Overall Project:

### Technical
### Hashtags

Hashtags will function similar to most social media sites. Clicking on a hashtag will show posts by other users with that same hashtag. The posts shown will be sorted by number of likes and number of comments.

The trending hashtags in the sidebar wil be based off the most used hashtags (by post count) in the last 24 hours.

### Notifications

Users will receive notifications if another user follows them or if a user likes, comments on, or shares one of their posts.

### Comments

Comments will function as a simple chain under posts and be displayed in the order they are made.

### Messages

Users will be able to message each other, but only if they both follow one another.

### Who to Follow Box

This will show the top 3 users followed most often by users you follow.

## Implementation:
Website uses:
 [Bootstrap 5](https://getbootstrap.com/), html5, css3, javascript, node.js with express, MongoDB package Mongoose.
