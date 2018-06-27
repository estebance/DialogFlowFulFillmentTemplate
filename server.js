'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {Text, Card, Image, Suggestion, Payload, WebhookClient} = require('dialogflow-fulfillment');
const yamlConfig = require('yaml-config');
const utilities = require('./utilities/utilities');
const YOUR_BACKEND_API_URL = ""


const server = express();
// configure server
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
// load languages if you want
// select a language and obtain the string
const settings_general = yamlConfig.readConfig('./config/general.yml', 'general');
console.log(settings_general.hi)
let i18n = utilities.languageSelector('es');
console.log(i18n.example.hi)
// create a server to receive incoming data from Dialogflow
server.post('/fullfilment', function (request, response) {
  let fullfilmentAgent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  // example to create post requests
  // function sayHello (fullfilmentAgent) {
    // const facebookUserId = request.body.originalDetectIntentRequest.payload.sender.id;
    // const userAuthUrl = YOUR_BACKEND_API_URL + '/api/v1/create_user';
    // const bodyRequest = {user: {facebook_id: facebookUserId}};
    // this is an example about how to do a request to your backend
    // let authApiPromise = utilities.postRequest(userAuthUrl, bodyRequest)
    // return authApiPromise.then(function (response) {
      // fullfilmentAgent.add('Hello this is your webhook');
    // }, function (err) {
      // console.log('Logger....' + err)
    // });
  // }

  // receive your requests
  function sayHello (fullfilmentAgent) {
    fullfilmentAgent.add('Hello this is your webhook');
  }

  let intentMap = new Map();
  intentMap.set('hello', sayHello);
  fullfilmentAgent.handleRequest(intentMap);
});

// listen
server.listen((process.env.PORT || 8000), function () {
  console.log("Server is up and listening");
});
