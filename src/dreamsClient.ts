import axios from 'axios';
import crypto from 'crypto';

const baseUrl = 'https://indreams.me';
const hmacSecret = 'gUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w';

function authHeaders(path: string, body: string) {
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

export interface QueryStringObject { [key: string]: undefined | string | number | string[] | number[] };

function stringifyQuery(query: QueryStringObject) {
  if (!query) 
    return '';
  const queryArray = Object.entries(query).map(([key, value]) => {
    return `${ key }=${ encodeURIComponent(Array.isArray(value) ? value.join('+') : value) }`;
  });
  return queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
}

export async function requestGet(endpoint: string, queryObject: QueryStringObject) {
  const path = endpoint + stringifyQuery(queryObject);
  return axios.get(`${ baseUrl }${ path }`, {
    headers: authHeaders(path, null)
  })
  .then(response => response.data)
  .catch(error => error.response.data);
}

export async function requestPost(path: string, body: any) {
  return axios.post(`${ baseUrl }${ path }`, body, {
    headers: authHeaders(path, JSON.stringify(body))
  })
  .then(response => response.data)
  .catch(error => error.response.data);
}