const mongoose = require('mongoose');


// use proms instead of CBs
// use built-in promise library from Mongoose:
mongoose.Promise = global.Promise;


// var User = require('./models/User');
//var Project = require('./models/Project');

mongoose.connect("mongodb://localhost:27017/ufos");

// const Project = mongoose.model('Project', {
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 3
//   },
//   craft: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 5
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 20
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }

// });
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
})

// const newProject = new Project({
//   title: "  Clare's blanket    ",
//   craft: "knitting",
//   description: "Squares finished and need to be stitched together.",
//   completed: false,
//   completedAt: 0
// });

// newProject.save().then((doc) => {
//   console.log(`Project saved:`);
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log("unable to save");
// });

const newUser = new User({
  email: ""
});
newUser.save().then((user) => {
  console.log("New user saved: ");
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log("unable to save user: ", e);
})