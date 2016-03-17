/* <summary>
 * 
 Node JS file for the server configuration 
 Server works on port 3000
 File sends all the information including the different sub folders
 </summary>*/

var express = require("express");
var http = require("http");
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://127.0.0.1:27017/test';
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(express.json());
//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//  console.log("Connected correctly to server.");
//  if (err) {
//      console.log(err);
//  }
//  db.close();
//});


//make sure it gets all the folders and files.
app.use(express.static(path.join(__dirname, '')));




var findRoom = function (db, callback) {
    var cursor = db.collection('lokalendb').find(/*Can find specific item by doing "nr":"0.09"*/);
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    })
}

//get the url and send the index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+"/index.html"));
});
app.post("/api/rooms", function (req, res) {
    var insertRoom = function (db, callback) {
        db.collection('lokalendb').insertOne({
            "nr": req.body.nr,
            "studentenNr": req.body.studentenNr,
            "tijd": req.body.tijd,
            "beschikbaar": req.body.beschikbaar,
            "voorwerpen":
                {
                    "hdmi": req.body.hdmi,
                    "afstandsbediening": req.body.afstandsbediening
                }
        }, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a room into the LokaalDB collection.");
            callback();
        })
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertRoom(db, function () {
            db.close();
        })
    })
});
app.get("/api/rooms", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        findRoom(db, function () {
            db.close();
        })
    })
})

//listen to port 3000 
var serverOptions = {
    port: 3000,
    host:"localhost"
    };
var server = app.listen(serverOptions, function () {
    var address = server.address().address;
    var port = server.address().port;
    console.info("Server listening: http://%s:%s", address, port);
})

