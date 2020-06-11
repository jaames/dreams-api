const axios = require('axios');
const crypto = require('crypto');

const baseUrl = 'https://indreams.me';
const hmacSecret = 'gUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w';
// dream|scene|element|collection|photo|version|tag
const dreamIdRegex = /[m|d|o|c|p|v|t]{1}[a-f0-9]{10}/;

function authHeaders(path, body) {
  const timestamp = Math.round((new Date).getTime() / 1000);
  const hmac = crypto.createHmac('sha256', hmacSecret);
  if (body) {
    hmac.update(body);
  }
  hmac.update(path);
  hmac.update(timestamp.toString());
  return {
    'X-Auth': hmac.digest('hex'),
    'X-Ts': timestamp
  }
}

function stringifyQuery(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.length > 0 ? ('?' + str.join('&')) : '';
}

exports.requestGet = function(endpoint, queryObject) {
  const path = endpoint + stringifyQuery(queryObject);
  return axios.get(`${ baseUrl }${ path }`, {
    headers: authHeaders(path, null)
  })
  .then(response => response.data)
  .catch(error => error.response.data);
}

exports.requestPost = function(path, body) {
  return axios.post(`${ baseUrl }${ path }`, body, {
    headers: authHeaders(path, JSON.stringify(body))
  })
  .then(response => response.data)
  .catch(error => error.response.data);
}