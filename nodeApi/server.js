var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');

var app = express();
app.use(cors());
const apiKey = "RGAPI-5075487a-7ff7-472f-9eb8-4e8449fe2898";


function getId(region, summoner) {
  var url = `https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    },
    json: true
  };
  return rp(options);   
}

//API: get user ID:
app.get('/getUserId/:region/:summoner', async function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  try{
    var summInfo = await getId(region, summoner);
    res.send(summInfo);
  }
  catch(err){
    console.log('Got an error:', err.message);
  }
});

async function getMatchListShort(id, region) { 
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}`;
  //var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=50`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    },
    json: true
  };
  var matchesList = await rp(options);

  return matchesList.matches;
}

function getMatchDetails(region, matchId) {
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    },
    json: true
  };
  return rp(options);
}

//API get last 100 matches:
app.get('/getLastMatches/:region/:id', async function (req, res, next) {
    var id = req.params.id;
    var region = req.params.region;
    var matchesLong = [], matchesShort;
    var startTime, endTime;
    var promises = [];
    try{
      matchesShort = await getMatchListShort(id, region);
    }
    catch(err){
      console.log('Error getting matches id list:', err.message);
    }

    try{
      startTime = Date.now();
      for(match of matchesShort){        
         matchesLong.push(await getMatchDetails(region, match.gameId));
      }
      endTime = Date.now() - startTime;
      console.log("endTime: ",endTime/1000);
    }
    catch(err){
      console.log('Error getting detailed matches list:', err.message);
    }
    res.send(matchesLong);  
});

//https://la2.api.riotgames.com/lol/match/v3/matches/481779596


app.listen(8081, function () {
   console.log("app listening at 8081");
})