var express = require('express');
var request = require('request');
var cors = require('cors');

var app = express();
app.use(cors());
const apiKey = "RGAPI-06b4d378-7f12-4a5c-9e20-644803d361c6";


//API: get user ID:
app.get('/getUserId/:region/:summoner', function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  var url = `https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`;
  var info = '';
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      info = JSON.parse(body);
      console.log(info);   
      res.send(info);
    }
    else{
      console.log('error: ',error);
    }
  });
});

//API get last 100 matches:
app.get('/getLastMatches/:region/:id', function (req, res, next) {
    var id = req.params.id;
    var region = req.params.region;
    var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}`;
    var info = '';
    var options = {
      url: url,
      headers: {
        "X-Riot-Token": apiKey
      }
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        console.log(info);   
        res.send(info);
      }
      else{
        console.log('error: ',error);
      }
    });
  });

//https://la2.api.riotgames.com/lol/match/v3/matches/481779596


app.listen(8081, function () {
   console.log("app listening at 8081");
})