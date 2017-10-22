var _ = require('lodash');

getFilteredData = (data, summName) => {
    console.log('filtering data...');
    //console.log('full data: ', data);

    var participantInfo = _.find(data[0].participantIdentities, (info) => info.player.summonerName === summName);
    var participantId = participantInfo.participantId;

    var gameData =  _.find(data[0].participants, (info) => info.participantId === participantId);

    console.log('gameData: ',gameData);




    return { gameData };
}

module.exports = {
    getFilteredData
}