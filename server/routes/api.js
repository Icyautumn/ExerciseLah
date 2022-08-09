const express = require("express");
const router = express.Router();
// declare axios for making http requests
const axios = require("axios");
const { devNull } = require("os");
const API = "https://jsonplaceholder.typicode.com";

// brcrypt
const bcrypt = require("bcryptjs");
const { ObjectID } = require("bson");
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

// profile
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
            res2.send([
              {
                auth: true,
                role: result.role,
                uid: result._id,
                username: result.username,
              },
            ]);
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
      {
        email: email,
        password: hash,
        username: username,
        role: role,
        dateJoined: dateJoined,
        userImage: userImage,
        fullName: fullName,
        bio: "",
        foodCalories: [],
      },
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
  db.collection("users").findOne({ _id: o_id }, function (err, result) {
    if (result == null) res2.send([{ auth: false }]);
    else {
      res2.send([
        {
          auth: true,
          username: result.username,
          email: result.email,
          userImage: result.userImage,
          role: result.role,
          dateJoined: result.dateJoined,
          fullName: result.fullName,
          bio: result.bio,
        },
      ]);
    }
  });
});

router.route("/profile/:id").put(function (req, res) {
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

router.route("/changePassword").put(function (req, res2) {
  var id = req.body.id;
  var password = req.body.currentPassword;
  var newpassword = req.body.newPassword;
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
            bcrypt.hash(newpassword, BCRYPT_SALT_ROUNDS, function (err, hash) {
              db.collection("users").updateOne(
                { _id: ObjectId(id) },
                {
                  $set: { password: hash }, // Update
                },
                (err, results) => {
                  res2.send(results);
                }
              );
            });
          }
        });
      }
    }
  );
});

// food
router.route("/foodCalories").post(function (req, res) {
  var id = req.body.id;
  db.collection("users").findOne({ _id: ObjectId(id) }, function (err, result) {
    if (result == null) res.send([{ auth: false }]);
    else {
      res.send([{ auth: true, foodCalories: result.foodCalories }]);
    }
  });
});

router.route("/foodCalories/create").put(function (req, res) {
  var id = req.body.id;
  var date = req.body.date;
  db.collection("users").updateOne(
    { _id: ObjectId(id) },
    { $push: { foodCalories: { date: date, foodItems: [] } } },
    function (err, result) {
      if (result == null) res.send([{ auth: false }]);
      else {
        res.send([{ auth: true, foodCalories: result }]);
      }
    }
  );
});

router.route("/foodCalories/update").put(function (req, res) {
  var id = req.body.id;
  var date = req.body.date;
  var foodItems = req.body.foodItems;
  db.collection("users").updateOne(
    { _id: ObjectId(id), foodCalories: { $elemMatch: { date: date } } },
    { $set: { "foodCalories.$.foodItems": foodItems } },
    function (err, result) {
      if (result == null) res.send([{ auth: false }]);
      else {
        res.send([{ auth: true, foodCalories: result }]);
      }
    }
  );
});

router.route("/food").post(function (req, res) {
  const request = require("request");
  var query = req.body.food;
  request.get(
    {
      url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      headers: {
        "X-Api-Key": "7497WxiknD46mNgYJl8jCg==rSjAlcAvGzn9pJ7t",
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else {
        res.send(body);
      }
    }
  );
});

// workout
router.route("/workout/add").put(function (req, res) {
  var workout_photo = req.body.workout_photo;
  var summary = req.body.summary;
  var calories_burnt = req.body.calories_burnt;
  var workout_type = req.body.workout_type;
  var duration = req.body.duration;
  var equipment = req.body.equipment;
  var listOfWorkout = req.body.listOfWorkout;
  var foodDetails = req.body.foodDetails;
  var commentOfUser = req.body.commentOfUser;
  var username = req.body.username;

  db.collection("workout").insertOne(
    {
      createdBy: username,
      workout_photo: workout_photo,
      summary: summary,
      calories_burnt: calories_burnt,
      workout_type: workout_type,
      duration: duration,
      equipment: equipment,
      workout: listOfWorkout,
      foodDetails: foodDetails,
      commentOfUser: commentOfUser,
    },
    (err, result) => {
      if (err) return console.log(err);

      res.send(result);
    }
  );
});

router.route("/workout/get").post(function (req, res) {
  db.collection("workout").find({}).toArray(function (err, result) {
    if(err) throw err;
    else {
      res.send([{ result: result }]);
    }
  });
});

router.route("/workout/specific").post(function (req, res) {
  var id = req.body.id;
  db.collection("workout").findOne(
    { _id: ObjectId(id) },
    function (err, result) {
    if (result == null) res.send([{ auth: false }]);
    else {
      res.send([{ result: result }]);
    }
  });
});

router.route("/workout/delete/:id").delete(function (req, res) {
  db.collection("workout").deleteOne(
    { _id: ObjectId(req.params.id) },
    function (err, result) {
    if (result == null) res.send([{ auth: false }]);
    else {
      res.send([{ result: result }]);
    }
  });
});

router.route("/workout/update/:id").put(function (req, res) {
  console.log(req.params.id);
  db.collection("workout").updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: req.body,
    },
    (err, results) => {
      res.send(results);
    }
  );
});

//comments
router.route("/comments/get").post(function (req, res2) {
  var id = req.body.id;
  let o_id = new ObjectId(id);
  db.collection("users").findOne({ _id: o_id }, function (err, result) {
    if (result == null) res2.send([{ auth: false }]);
    else {
      res2.send([
        {
          auth: true,
          username: result.username,
          userImage: result.userImage,

        },
      ]);
    }
  });
});

router.route("/comments/create").put(function (req, res) {

  var workout_id = req.body.workout_Id;
  console.log(workout_id);
  var userId = req.body.user_id;
  var rating = req.body.rating;
  var comment = req.body.comment;
  var objectId = new ObjectID();
  db.collection("workout").updateOne(
    { _id: ObjectId(workout_id) },
    { $push: { commentOfUser: { commentid: objectId, userId: userId, comment: comment, rating: rating, replies: [] } } },
    function (err, result) {
      if (result == null) res.send([{ auth: false }]);
      else {
        res.send([{ auth: true, commentOfUser: result }]);
      }
    }
  );
});

module.exports = router;
