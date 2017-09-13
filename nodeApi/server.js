var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');

var app = express();
app.use(cors());
const apiKey = "RGAPI-09a2b095-cd58-4282-a174-b7e1627bc57b";


function getId(region, summoner) {
  var url = `https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    }
  };
  return rp(options);   
}

//API: get user ID:
app.get('/getUserId/:region/:summoner', async function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  try{
    var id = await getId(region, summoner);
  }
  catch(err){
    console.log('Got an error:', err.message);
  }
  res.send(id);
});

async function getMatchListIds(id, region) { 
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=3`;
  var idsArray = '';
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    }
  };
  var matches = await rp(options);
  console.log('matches list:', matches);

  console.log('matches ids list:', matchIds);
  try{
    detailedMatchList = await getMatchDetails(region, matchIds[0].gameId);
  }
  catch(err){
    console.log('Error getting detailed matches list:', err.message);
  }

}
function getMatchDetails(region, matchId) {
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    }
  };
  return rp(options);
}

//API get last 100 matches:
app.get('/getLastMatches/:region/:id', async function (req, res, next) {
    var id = req.params.id;
    var region = req.params.region;
    var detailedMatchList;
    var matches;
    try{
      matches = await getMatchListIds(id, region);
    }
    catch(err){
      console.log('Error getting matches id list:', err.message);
    }


    res.send(detailedMatchList);  
});

//https://la2.api.riotgames.com/lol/match/v3/matches/481779596


app.listen(8081, function () {
   console.log("app listening at 8081");
})