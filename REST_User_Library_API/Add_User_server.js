//Add User API - from: https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
//User is hard coded here - change to read from - file - web form data - passed into variable?
//In browser: http://127.0.0.1:8081/addUser 

var express = require('express');
var app = express();
var fs = require("fs");

//What other ways can use data be retrieved?
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})