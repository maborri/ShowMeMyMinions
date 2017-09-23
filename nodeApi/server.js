
var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');
var batch = require( 'batch-promise' );

var app = express();
app.use(cors());
const apiKey = "RGAPI-ea167f61-af3d-4d65-866f-daafcacd33a1";


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
 // var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}`;
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=50`;
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

async function getMatchDetails(region, matchId) {
  var url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    },
    json: true,
    resolveWithFullResponse: true 
  };
  var match;
  await rp(options).then((response) => {
     console.log(JSON.stringify(response.headers));
     console.log(JSON.stringify(response.statusCode));
     match = response.body;
  })
  .catch((response) => {
    console.log(JSON.stringify(response.headers));
    console.log(JSON.stringify(response.statusCode));
 });
  
  return match;
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
    async function call20Times() {
      for(let i = 0; i < 20; i++){
        if(currentIndex == matchesShort.length) {
          clearInterval(timer);
          matchesLong = await Promise.all(promises);
          res.send(matchesLong);
          endTime = Date.now() - startTime;
          console.log("endTime: ",endTime/1000);  
          break;            
        }               
        promises.push(getMatchDetails(region, matchesShort[i].gameId));
        currentIndex++;
        console.log(currentIndex);
      }
    }
    try{
      startTime = Date.now();
      var currentIndex = 0;
      call20Times();
      var timer = setInterval(call20Times, 1500);       
    }
    catch(err){
      console.log('Error getting detailed matches list:', err.message);
    }

});

//https://la2.api.riotgames.com/lol/match/v3/matches/481779596


app.listen(8081, function () {
   console.log("app listening at 8081");
})
>>>>>>> dd3ec460b18c98c41c9a413ef80c68338567b136
