var express = require('express');
var request = require('request');
var rp = require('request-promise');
var cors = require('cors');

var app = express();
app.use(cors());
const apiKey = "RGAPI-06b4d378-7f12-4a5c-9e20-644803d361c6";


//API: get user ID:
async function getId(region, summoner) {
  var url = `https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`;
  var options = {
    url: url,
    headers: {
      "X-Riot-Token": apiKey
    }
  };
  try {
    var summonerInfo = await rp(options);  
    return summonerInfo.accountId; 
  }catch(err) {
    console.log('Got an error:', err.message)
  }
}

app.get('/getUserId/:region/:summoner', async function (req, res, next) {
  var region = req.params.region;
  var summoner = req.params.summoner;
  var id = await getId(region, summoner);
  console.log("id: ",id);
  res.send(id);
});

//API get last 100 matches:
app.get('/getLastMatches/:region/:id', function (req, res, next) {
    var id = req.params.id;
    var region = req.params.region;
    var url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?beginIndex=0&endIndex=3`;
    var idsArray = '';
    var options = {
      url: url,
      headers: {
        "X-Riot-Token": apiKey
      }
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        idsArray = info.matches.map((match) => match.gameId);
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