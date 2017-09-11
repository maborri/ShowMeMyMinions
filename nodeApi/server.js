const request = require('request-promise');

const options = {  
  method: 'GET',
  uri: 'https://risingstack.com'
}


request(options)  
  .then(function (response) {
    // Request was successful, use the response object at will
  })
  .catch(function (err) {
    // Something bad happened, handle the error
  })