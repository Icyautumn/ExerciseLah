const express = require('express');
const router = express.Router();
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
/* GET api listing. */
router.get('/', (req, res) => {
res.send('api works');
});

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var db;
MongoClient.connect('mongodb+srv://Icyautumn:Eugene11@exerciselah.tmgjc.mongodb.net/ExerciseLah?retryWrites=true&w=majority', { useNewUrlParser: true ,
useUnifiedTopology: true }, (err, database) => {
if (err) return console.log(err);
db = database.db('miniprojectDB');
});
// create new post
router.route('/users').post(function (req, res) {
db.collection('posts').insertOne(req.body, (err, results) => {
if (err) return console.log(err);
console.log('saved to database');
res.send(results);
});
});


module.exports = router;
