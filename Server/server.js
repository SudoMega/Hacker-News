// server.js

const express = require('express');
const app = express();
const mongodb = require('mongodb');
const PORT = 4000;

const config = require('./db');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cors = require ('cors');
const bodyParser = require('body-parser')

const client = mongodb.MongoClient;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var newsSchema = new mongoose.Schema({
    created_at:       Date,
    title:            null | String,
    url:              null | String,
    author:           String,
    points:           Number | null,
    story_text:       null | String,
    comment_text:     null | String,
    num_comments:     Number | null,
    story_id:         Number | null,
    story_title:      null | String,
    story_url:        null | String,
    parent_id:        Number | null,
    created_at_i:     Number,
    objectID:         String,
    isdeleted:        Number,
  });

var User = mongoose.model("user", newsSchema);

//connect to DB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true , useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log('MongoDb conection OK');
  }
});

//Load the data
var ourRequest = new XMLHttpRequest()
ourRequest.open('GET', 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
ourRequest.onload = dataload
ourRequest.send();

//Function to add an identifier, to know if the object as been deleted
//It delete the elements that dont have a title
function dataload(){
    var newsdata = JSON.parse(ourRequest.responseText);
    for (i = 0; i < newsdata.hits.length; i++) {
        if (newsdata.hits[i].isdeleted == 1){}

        else {newsdata.hits[i].isdeleted = 2;}
      } 
    // console.log(newsdata);
    this.datostemp = newsdata;
    return datostemp;
}

app.get('/', function(req, res) {
    res.send(datostemp.hits);
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});