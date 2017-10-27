var _ = require('lodash');

getFilteredData = (data, summName) => {
    console.log('filtering data...');
    console.log('---------------- full data: ---------------- ', data);

    var matchesFound = data.length;
    var idsPerMatch = [];
    data.forEach(function(match) {
        let participantInfo = _.find(match.participantIdentities, (info) => info.player.summonerName === summName);   
        idsPerMatch.push(participantInfo.participantId);
    }, this);

    console.log('---------------- idsPerMatch: ---------------- ',idsPerMatch);
    
    var gamedataPerId = [];
    for(let i = 0; i < matchesFound; i++) {
        gamedataPerId.push( _.find(data[i].participants, (info) => info.participantId === idsPerMatch[i]));
    }

    var kills = 0; 
    var deaths = 0;
    var assists = 0;
    var doubleKills = 0;
    var tripleKills = 0;
    var quadraKills = 0;
    var pentaKills = 0;
    var goldEarned = 0;
    var totalDamageDealtToChampions = 0;
    var totalDamageTaken = 0;
    var totalMinionsKilled = 0;
    var neutralMinionsKilled = 0;

    gamedataPerId.forEach(function(game) {
        kills += game.stats.kills;
        deaths += game.stats.deaths;
        assists += game.stats.assists;
        doubleKills += game.stats.doubleKills;
        tripleKills += game.stats.tripleKills;
        quadraKills += game.stats.quadraKills;
        pentaKills += game.stats.pentaKills;

        goldEarned += game.stats.goldEarned;
        totalDamageDealtToChampions += game.stats.totalDamageDealtToChampions;
        totalDamageTaken += game.stats.totalDamageTaken;

        totalMinionsKilled += game.stats.totalMinionsKilled;
        neutralMinionsKilled += game.stats.neutralMinionsKilled;
    }, this);
    
    console.log('---------------- gamedataPerId ---------------- ', gamedataPerId);
    console.log('---------------- kills ---------------- ', kills);
    console.log('---------------- deaths ---------------- ', deaths);
    console.log('---------------- assists ---------------- ', assists);
    console.log('---------------- doubleKills ---------------- ', doubleKills);
    console.log('---------------- tripleKills ---------------- ', tripleKills);
    console.log('---------------- quadraKills ---------------- ', quadraKills);
    console.log('---------------- pentaKills ---------------- ', pentaKills);
    console.log('---------------- goldEarned ---------------- ', goldEarned);
    console.log('---------------- totalDamageDealtToChampions ---------------- ', totalDamageDealtToChampions);
    console.log('---------------- totalDamageTaken ---------------- ', totalDamageTaken);
    console.log('---------------- totalMinionsKilled ---------------- ', totalMinionsKilled);
    console.log('---------------- neutralMinionsKilled ---------------- ', neutralMinionsKilled);

    var agregatedInfo = {
        matchesFound,
        kills, deaths, assists, 
        doubleKills, tripleKills, quadraKills, pentaKills,
        goldEarned, totalDamageDealtToChampions, totalDamageTaken,
        totalMinionsKilled, neutralMinionsKilled 
        };

    return { agregatedInfo };
}

module.exports = {
    getFilteredData
}