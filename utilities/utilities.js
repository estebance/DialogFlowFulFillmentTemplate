'use strict';

const https = require("https");
const request = require('request');
const yamlConfig = require('yaml-config');

module.exports = {
  // Generate a get request to your backend
  getRequest: function(fullRequest) {
    // Set a URL and headers for request
    var options = {
        url: fullRequest,
        headers: {
          "Content-Type": "application/vnd.api+json"
        }
    };
    // Return new promise (this is to ensure we are returning a response to our client)
    return new Promise(function(resolve, reject) {
      request.get(options, function(err, resp, body) {
          if (err) {
              reject(err);
          } else {
              if (resp.statusCode == 200){
                resolve(JSON.parse(body))
              }
              else{
                reject('no events found')
              }
          }
      });
    });
  },

  // Generate a post request to your backend
  postRequest: function (requestUrl, bodyRequest) {
    let bodyJson = JSON.stringify(bodyRequest);
    let headers = {
        "Content-Type": "application/vnd.api+json",
        "Content-Length": bodyJson.length
    };
    let options = {
      url: requestUrl,
      method: "POST",
      headers: headers,
      body: bodyJson
    };
    // Return new promise (this is to ensure we are returning a response to our client)
    return new Promise(function(resolve, reject) {
      request.post(options, function(err, resp, body){
        if (err){
            reject(err);
        } else {
          resolve(JSON.parse(body))
        }
      });
    });
  },

  // Selects language for interaction w/user
  languageSelector: function (language){
    if (language === 'es'){
      return yamlConfig.readConfig('./config/language_es.yml', 'es');
    }
    else{
      return yamlConfig.readConfig('./config/language_en.yml', 'en');
    }
  },

  // whether you get the language in a long format parse it to a short format
  // you can obtain this format from your backend or even DialogFlow
  languageSwitcher: function(language){
    let language_selected = ''
    switch (language) {
      case 'english':
        language_selected = 'en';
        break;
      case 'español':
        language_selected = 'es';
        break;
    }
    return language_selected
  }
}
