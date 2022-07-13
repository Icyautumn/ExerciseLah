const express = require("express");
const router = express.Router();
// declare axios for making http requests
const axios = require("axios");
const { devNull } = require("os");
const API = "https://jsonplaceholder.typicode.com";
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
// create new post
router.route("/users").post(function (req, res) {
  db.collection("users").insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.send(results);
  });
});

// retrieve all posts
router.route('/users').get(function (req, res) {
  db.collection('users').find().toArray(function (err, results) {
    if(err) return console.log(err);
    console.log(results);
    res.send(results);
  });
});

//delete posts based on id
router.route('/users/:_id').delete(function(req, res) {
  db.collection('users').deleteOne({"_id": ObjectId(req.params._id)}, (err, results) =>{
    res.send(results);
  })
})

// update post based on id
router.route('/users/:_id').put(function (req, res) {
  db.collection('users').updateOne( {"_id": ObjectId(req.params._id)}, {
    $set: req.body
  }, (err, results) =>{
    res.send(results);
  })
})
module.exports = router;
