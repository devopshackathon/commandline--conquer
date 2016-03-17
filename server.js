/* <summary>
 * 
 Node JS file for the server configuration 
 Server works on port 3000
 File sends all the information including the different sub folders
 </summary>*/

var express = require("express");
var http = require("http");
var path = require('path');

var app = express();

//make sure it gets all the folders and files.
app.use(express.static(path.join(__dirname, '')));

//get the url and send the index.html
app.get("/", function (req, res) {
    
    res.sendFile(path.join(__dirname+"/index.html"));
    
});
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
