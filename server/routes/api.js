const express = require("express");
const router = express.Router();
// declare axios for making http requests
const axios = require("axios");
const { devNull } = require("os");
const API = "https://jsonplaceholder.typicode.com";

// brcrypt
const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 12;

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
var db;
MongoClient.connect(
  "mongodb+srv://Icyautumn:Eugene11@exerciselah.tmgjc.mongodb.net/ExerciseLah?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("ExerciseLah");
  }
);
// // create new post
// router.route("/users").post(function (req, res) {
//   db.collection("users").insertOne(req.body, (err, results) => {
//     if (err) return console.log(err);
//     console.log("saved to database");
//     res.send(results);
//   });
// });

// // retrieve all posts
// router.route('/users').get(function (req, res) {
//   db.collection('users').find().toArray(function (err, results) {
//     if(err) return console.log(err);
//     console.log(results);
//     res.send(results);
//   });
// });

// //delete posts based on id
// router.route('/users/:_id').delete(function(req, res) {
//   db.collection('users').deleteOne({"_id": ObjectId(req.params._id)}, (err, results) =>{
//     res.send(results);
//   })
// })

// // update post based on id
// router.route('/users/:_id').put(function (req, res) {
//   db.collection('users').updateOne( {"_id": ObjectId(req.params._id)}, {
//     $set: req.body
//   }, (err, results) =>{
//     res.send(results);
//   })
// })

router.route("/authuser").post(function (req, res2) {
  var email = req.body.email;
  var password = req.body.password;
  db.collection("users").findOne(
    { email: email },
    { password: 1, role: 1, _id: 0 },
    function (err, result) {
      if (result == null) res2.send([{ auth: false }]);
      else {
        bcrypt.compare(password, result.password, function (err, res) {
          if (err || res == false) {
            res2.send([{ auth: false }]);
          } else {
            res2.send([{ auth: true, role: result.role, uid: result._id }]);
          }
        });
      }
    }
  );
});
router.route("/reguser").post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  var userImage = req.body.userImage;
  var dateJoined = req.body.dateJoined;
  var role = req.body.role;
  var fullName = req.body.fullName;


  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function (err, hash) {
    db.collection("users").insertOne(
      { email: email, password: hash, username: username, role: role, dateJoined: dateJoined, userImage: userImage, fullName: fullName, bio: "" },
      (err, result) => {
        if (err) return console.log(err);
        console.log("user registered");
        res.send(result);
      }
    );
  });
});

router.route("/profile").post(function (req, res2) {
  var _id = req.body._id;
  let o_id = new ObjectId(_id);
  db.collection("users").findOne(
    {"_id" : o_id },
    function(err, result){
      if (result == null) res2.send([{ auth: false }]);
      else{
        res2.send([{ auth: true, username: result.username, email: result.email, userImage: result.userImage, role: result.role, dateJoined: result.dateJoined, fullName: result.fullName, bio: result.bio}]);
      }
    }
  )
});

router.route('/profile/:id').put(function (req, res) {
  db.collection("users").updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: req.body,
    },
    (err, results) => {
      res.send(results);
    }
  );
});

router.route("/foodCalories").post(function (req, res) {
  var id = req.body.id;
  db.collection("users").findOne(
    {"_id": ObjectId(id)},
    function(err, result){
      if (result == null) res.send([{ auth: false }]);
      else{
        res.send([{ auth: true, foodCalories: result.foodCalories}]);
      }
    }
  )
});

router.route("/changePassword").put(function (req, res2) {
  var id = req.body.id;
  console.log("meow");
  var password = req.body.currentPassword;
  console.log(password);
  var newpassword = req.body.newPassword;
  console.log(newpassword);
  db.collection("users").findOne(
    { _id: ObjectId(id) },
    { password: 1, role: 1, _id: 0 },
    function (err, result) {
      if (result == null) res2.send([{ auth: false }]);
      else {
        bcrypt.compare(password, result.password, function (err, res) {
          if (err || res == false) {
            console.log("did not work");
            res2.send([{ auth: false }]);
          } else {
            console.log("worked");
            // change the password and set the bcrypt as the new password
            bcrypt.hash(newpassword, BCRYPT_SALT_ROUNDS, function(err, hash) {
              db.collection("users").updateOne(
                { _id: ObjectId(id) },
                {
                  $set: {"password": hash}, // Update
                },
                (err, results) => {
                  res2.send(results);
                }
              )
            })
          }
        });
      }
    }
  );
});


module.exports = router;
