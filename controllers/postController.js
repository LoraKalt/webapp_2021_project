"use strict";

const PostMsg = require("../models/message"),
  getPostMsgParams = body => {
    return {
      user: body.user,
      postDate: body.postDate,
      postText: body.postText,
      multiMedia: body.multiMedia,
      comments: body.comments
    };
  };
//Still need to customize and also have some image handling
module.exports = {
  index: (req, res, next) => {
    PostMsg.find()
      .then(postmsgs => {
        res.locals.postmsgs = postmsgs;
        next();
      })
      .catch(error => {
        console.log(`Error fetching postmsgs: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("home");
  },

  new: (req, res) => {
    res.render("home"); //assuming users create posts on their "home" page
  },

  create: (req, res, next) => {
    let postmsgParams = getPostMsgParams(req.body);
    PostMsg.create(postmsgParams)
      .then(postmsg => {
        res.locals.redirect = "/home"; //TODO: Change
        res.locals.postmsg = postmsg;
        next();
      })
      .catch(error => {
        console.log(`Error saving postmsg: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let postmsgId = req.params.id;
    PostMsg.findById(postmsgId)
      .then(postmsg => {
        res.locals.postmsg = postmsg;
        next();
      })
      .catch(error => {
        console.log(`Error fetching postmsg by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("postmsgs/show"); //TODO: Change
  },

//   edit: (req, res, next) => {
//     let postmsgId = req.params.id;
//     PostMsg.findById(postmsgId)
//       .then(postmsg => {
//         res.render("postmsgs/edit", {
//           postmsg: postmsg
//         });
//       })
//       .catch(error => {
//         console.log(`Error fetching postmsg by ID: ${error.message}`);
//         next(error);
//       });
//   },

//   update: (req, res, next) => {
//     let postmsgId = req.params.id,
//       postmsgParams = getPostMsgParams(req.body);

//     PostMsg.findByIdAndUpdate(postmsgId, {
//       $set: postmsgParams
//     })
//       .then(postmsg => {
//         res.locals.redirect = `/postmsgs/${postmsgId}`;
//         res.locals.postmsg = postmsg;
//         next();
//       })
//       .catch(error => {
//         console.log(`Error updating postmsg by ID: ${error.message}`);
//         next(error);
//       });
//   },

  delete: (req, res, next) => {
    let postmsgId = req.params.id;
    PostMsg.findByIdAndRemove(postmsgId)
      .then(() => {
        res.locals.redirect = "/postmsgs"; //TODO: Change
        next();
      })
      .catch(error => {
        console.log(`Error deleting postmsg by ID: ${error.message}`);
        next();
      });
  }
};


