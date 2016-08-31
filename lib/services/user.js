'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

require('isomorphic-fetch');

var _environment = require('../constants/environment');

var _endpoints = require('../constants/endpoints');

function login(email, password) {
  return new Promise(function (resolve, reject) {
    var url = _environment.ENVIRONMENT.API_PATH + _endpoints.USER.LOGIN;

    var payload = {
      email: email,
      password: password
    };

    var options = {
      method: 'POST',
      body: JSON.stringify(payload)
    };

    return fetch(url, options).then(function (response) {
      return checkStatus(response);
    }).then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      return resolve(responseJson);
    }).catch(function (error) {
      return reject(error);
    });
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.text().then(function (responseObj) {
      var response = JSON.parse(responseObj);
      throw new Error(response.message);
    });
  }
}
//# sourceMappingURL=user.js.map