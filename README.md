# CU-Denver Social Project (working title)
## Group:
+ Lora Kalthoff
+ Dax Hurley
---
## Description:


---
## Tasks:
Assignment 2:
- Lora : [Part 2](https://github.com/LoraKalt/webapp_2021_project/tree/assignment-2) - Form Validation of Sign-up (Part 2)
- Dax : [Part 1](https://github.com/dax-orion/web_apps_assignment_2_p1) - Google Books Search API (Part 1)

---
## Assignment 2 - Usage:

1. Clone the repo.
2. Open sign-up.html in any modern web browser.

OR view in github pages:

[signup.html](https://lorakalt.github.io/webapp_2021_project/signup.html) - Github pages were updated to work specifically on the assignment-2 branch. However if for some reason the specific branch is not being shown, either cache needs to be refreshed or the repo needs to be downloaded to see changes. 


## Design Decisions - Assignment 2:

'validateSignUp()' function runs on every form submit.

Email and password validation implemented using regex.

## Design Decisions - Overall Project:

### Technical

Currently, the site uses plain JavaScript with HTML and CSS, down the road as we build the site out we plan to migrate to using a component based framework such as Vue.
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
Website uses [Bootstrap 5](https://getbootstrap.com/), html5, css3, javascript, node.js with express, mongoose

---
## TODO:
### View/interface
- make a welcome page or redirect to login page
- signup.ejs 
    - add action/method to form
    - add capability of passing error messages
        - (errors: renders signup.ejs with errors)
- login.ejs
    - add action/method to form
    - add capability of passing error messages
        - (errors: renders signup.ejs with errors)
- successful login renders home.ejs

### server side:
- It's own validation check
- db 