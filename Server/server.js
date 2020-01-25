const express = require('express');
const app = express();
const mongodb = require('mongodb');
const PORT = 4000;
const config = require('./db');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cors = require ('cors');
const bodyParser = require('body-parser')
const assert = require('assert');


var tempdata;
const client = mongodb.MongoClient;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Load the data
var ourRequest = new XMLHttpRequest()
ourRequest.open('GET', 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
ourRequest.onload = dataload
ourRequest.send();

  //------------------------------------//
 //---------------ROUTES---------------//
//------------------------------------//

app.get('/', function(req, res) {
    res.send(tempdata.hits);
});

// here is where the client gets its data, 
// it should only return data that wasn't deleted by the user.
app.get('/news', function(req, res) {
    var resultArray = [];
    client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
        var db = client.db('mynewsdb')
        var cursor = db.collection('news-data').find().sort( { created_at: -1 } );
        cursor.forEach(function(element, err) {
            if (element.isdeleted === false){
                resultArray.push(element);
            }
        }, function(){
            client.close();
            res.send(resultArray);
        });
    });
});

//Loads the first set of data to the Database
app.get('/init', function(req, res) {
    client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
        var db = client.db('mynewsdb');
        tempdata.hits.forEach(function(dataElement, err) {        
            if (dataElement.title !== null || dataElement.story_title !== null) {
                db.collection('news-data').insertOne(dataElement, function (err, result) {
                    console.log('item inserted');
                });
            }
        },function (){
            client.close();
            res.redirect('/news');
        });
    });
});

//Gives the Tag Deleted to an item.
//It dosent delete the item from the DB, because it would be reloaded once an hour
app.get('/delete/:id', function(req, res) {
  console.log(req.params.id);
  var resultArray = [];
  var item = { isdeleted: true };
  client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
      var db = client.db('mynewsdb');
      db.collection("news-data").updateOne({"objectID": req.params.id}, {$set: item}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        client.close();
      });
  });
});



  //-----------------------------------------//
 //----------------FUNCTIONS----------------//
//-----------------------------------------//

//Checks for new news every 1 hour and adds them to the database
//Only add non duplicate entries and non null titles (both titles)
setInterval(dataRefresh, 1000*60*60);
function dataRefresh(){
    var resultArray = [];
    var ourRequest = new XMLHttpRequest()
    ourRequest.open('GET', 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    ourRequest.onload = dataload
    ourRequest.send();

    client.connect(config.DB, { useUnifiedTopology: true }, function(err, client) {
        var db = client.db('mynewsdb');
        var cursor = db.collection('news-data').find();
        cursor.forEach(element => {
            resultArray.push(element);
        },function(){
            tempdata.hits.forEach(dataElement => {        
                var duplicated = 0;
                if (dataElement.title === null && dataElement.story_title === null) {duplicated--;}
                //Check if there are duplicates in the Database, by matching their object ID's.
                //it also check the new aditions for null titles.
                resultArray.forEach(element => {
                    if (element.objectID !== dataElement.objectID){
                        duplicated++;
                    }
                    else {duplicated--;}
                    if (duplicated === resultArray.length) {
                        db.collection('news-data').insertOne(dataElement, function (err, result) {
                            console.log('item inserted');
                        });         
                    }
                    console.log(duplicated);
                }); 
            }, function(){
                client.close();
            });    
        });
    });
}

//Function to add an identifier to know if the object as been deleted by the client
function dataload(){
    var newsdata = JSON.parse(ourRequest.responseText);
    for (i = 0; i < newsdata.hits.length; i++) {
        newsdata.hits[i].isdeleted = false;
    }
    tempdata = newsdata;
    console.log('refreshing data!');
    return tempdata;
}


//open the server port, port 4000
app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});