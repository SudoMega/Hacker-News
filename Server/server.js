// server.js

const express = require('express');
const app = express();
// const mongoose = require('mongoose')
const mongodb = require('mongodb');
const PORT = 4000;

const config = require('./db');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cors = require ('cors');
const bodyParser = require('body-parser')
const assert = require('assert');

const client = mongodb.MongoClient;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var newsSchema = new mongoose.Schema({
//     created_at:       Date,
//     title:            null | String,
//     url:              null | String,
//     author:           String,
//     points:           Number | null,
//     story_text:       null | String,
//     comment_text:     null | String,
//     num_comments:     Number | null,
//     story_id:         Number | null,
//     story_title:      null | String,
//     story_url:        null | String,
//     parent_id:        Number | null,
//     created_at_i:     Number,
//     objectID:         String,
//     isdeleted:        Number,
//   });

// var User = mongoose.model("user", newsSchema);

// connect to DB
client.connect(config.DB, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
        db.close();
    }
});

//Load the data
var tempdata;
var ourRequest = new XMLHttpRequest()
ourRequest.open('GET', 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
ourRequest.onload = dataload
ourRequest.send();

// client.connect(config.DB, { useUnifiedTopology: true }, function(err, db) {
//     assert.equal(null, err);
//     db.collection('news-data').insertOne(tempdata, function(err, result){
//         assert.equal(null, err);
//         console.log('item inserted');
//         db.close();
//     });
// });

app.get('/', function(req, res) {
    res.send(tempdata.hits);
});

app.get('/news', function(req, res) {
    var resultArray = [];
    client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
        // assert.equal(null, err);
        var db = client.db('mynewsdb')
        var cursor = db.collection('news-data').find();
        cursor.forEach(function(element, err) {
            if (cursor[element].isdeleted === false){
                resultArray.push(element);
            }
        }, function(){
            client.close();
            res.send(resultArray);
        });
    });
});

app.get('/init', function(req, res) {
    client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
        var db = client.db('mynewsdb');
        var cursor = db.collection('news-data').find();
        for (let x = 0; x < tempdata.length; x++) {
            var duplicated = false;
            if (tempdata.hits[x].title === null && tempdata.hits[x].story_title === null) {duplicated = true}
            for (let y = 0; y < cursor.length; y++) {
                if (cursor[y].objectID === tempdata.hits[x].objectID){duplicated = true; y = cursor.length; console.log('duplicated' + x);}
            }
            if (duplicated === false) {
                db.collection('news-data').insert(tempdata.hits[x], function(err, result){
                    console.log('item inserted');
                });
            }
        }
        client.close();
        res.redirect('/news');           
    });
});

//Function to add an identifier to know if the object as been deleted
function dataload(){
    var newsdata = JSON.parse(ourRequest.responseText);
    for (i = 0; i < newsdata.hits.length; i++) {
        newsdata.hits[i].isdeleted = false;
    }
    tempdata = newsdata;
    return tempdata;
}

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});