var request = require('request');
var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
var idinfo;

var request = require('request');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getUserId', (request, response) => { 
    request('https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/dustz', (error, response, body) => {
       response.json(body);
    });
    //"https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/dustz"

 });

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);