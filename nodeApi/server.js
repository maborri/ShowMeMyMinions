
var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');
var _ = require('lodash');
var config = require('./config');
var matchDataFilters = require('./matchDataFilters');

var app = express();
app.use(cors());
app.on('unhandledRejection', (reason) => {
  console.log('Reason: ' + reason);
});

// const severVer = rp(severOptions)
//   .then((res)=> serverVer = res[0])
//   .catch(function(e){console.log(e)});;   
const severVer = config.ddVersion;

/*
 * API: get user ID:
 */
app.get('/getUserId/:region/:summoner', async function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  var summInfo = {
    severVer,
    info: {}
  };
  summInfo.severVer = severVer;
  try{
    summInfo.info = await getId(region, summoner);
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
  return rp(options).catch(function(e){console.log(e)});;   
}

/*
 * API get last 100 matches:
 */
app.get('/getLastMatches/:region/:id/:summName', async function (req, res) {
    var summName = req.params.summName;
    var id = req.params.id;
    var region = req.params.region;
    var matchesLong = [], matchesShort;
    var startTime, endTime;
    var promises = [];

    async function getDetailsAndFilter() {
        while(currentIndex < matchesShort.length){
          if(currentIndex % 18 === 0 && currentIndex !== 0){
            console.log("18 matches procesed, waiting...");
            setTimeout(function() {
              console.log("waited 2 seconds");
            }, 2000);
          }
          if(!currentIndex == (matchesShort.length-1)){ 
            promises.push(getMatchDetails(region, matchesShort[currentIndex].gameId));         
            console.log("Proccessing match number: ", matchesShort[currentIndex].gameId);
            currentIndex++;
          }
          else {
            promises.push(getMatchDetails(region, matchesShort[currentIndex].gameId));    
            currentIndex++;           
          }
        }
        matchesLong = await Promise.all(promises);
        var filteredData = matchDataFilters.getFilteredData(matchesLong, summName);
        res.end(JSON.stringify(filteredData));
        endTime = Date.now() - startTime;
        console.log("endTime: ",endTime/1000);           
    }

    try{
      matchesShort = await getMatchListShort(id, region);
    }
    catch(err){
      console.log('Error getting matches id list:', err.message);
    }
    startTime = Date.now();
    var currentIndex = 0;
    getDetailsAndFilter();     
});

async function getMatchDetails(region, matchId) {
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}`;
  console.log("matchId: ",matchId);
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": config.apiKey
    },
    json: true,
    resolveWithFullResponse: true 
  };
  var match;
  try {
    await rp(options).then((response) => {
      match = response.body;
    });
  }
  catch(err){
    console.log('Error getting match details:', err.message);
  }  

  return match;
}

async function getMatchListShort(id, region) { 
  //var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}`;
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?endIndex=10`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": config.apiKey
    },
    json: true
  };
  try {
    var matchesList = await rp(options);
    return matchesList.matches;
  }
  catch(err){
    console.log('Error getting match list short:', err.message);
  }  
}

const serverVersions = 'https://la2.api.riotgames.com/lol/static-data/v3/versions'
const serverVer = '';

const severOptions = {
  url: serverVersions,
  headers: {
    "X-Riot-Token": config.apiKey
  },
  json: true
};



app.listen(8081, function () {
   console.log("app listening at 8081");
})

