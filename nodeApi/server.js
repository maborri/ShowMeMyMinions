
var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');
var _ = require('lodash');
var config = require('./config');
var matchDataFilters = require('./matchDataFilters');

var app = express();
app.use(cors());

/*
 * API: get user ID:
 */
app.get('/getUserId/:region/:summoner', async function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  try{
    var summInfo = await getId(region, summoner);
    res.send(summInfo);
  }
  catch(err){
    console.log('Got an error:', err.message);
    res.status(err.statusCode).send({ error: err.message });
  }
});

function getId(region, summoner) {
  var url = `https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": config.apiKey
    },
    json: true
  };
  return rp(options);   
}

/*
 * API get last 100 matches:
 */
app.get('/getLastMatches/:region/:id/:summName', async function (req, res, next) {
    var summName = req.params.summName;
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
    async function call18Times() {
      for(let i = 0; i < 18; i++){
        if(currentIndex == matchesShort.length) {
          clearInterval(timer);
          matchesLong = await Promise.all(promises);
          var filteredData = matchDataFilters.getFilteredData(matchesLong, summName);
          console.log('filteredData',filteredData)
          res.send(filteredData);
          endTime = Date.now() - startTime;
          console.log("endTime: ",endTime/1000);  
          break;            
        }               
        promises.push(getMatchDetails(region, matchesShort[i].gameId));
        currentIndex++;
        console.log(matchesShort[i].gameId);
      }
    }
    try{
      startTime = Date.now();
      var currentIndex = 0;
      call18Times();
      var timer = setInterval(call18Times, 1500);       
    }
    catch(err){
      console.log('Error getting detailed matches list:', err.message);
    }
});

async function getMatchDetails(region, matchId) {
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": config.apiKey
    },
    json: true,
    resolveWithFullResponse: true 
  };
  var match;
  await rp(options).then((response) => {
     match = response.body;
  })
  .catch((response) => {
    console.log('Error getting match details:', err.message);
  });
  return match;
}

async function getMatchListShort(id, region) { 
  //var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}`;
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=1`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": config.apiKey
    },
    json: true
  };
  var matchesList = await rp(options);
  return matchesList.matches;
}


app.listen(8081, function () {
   console.log("app listening at 8081");
})

