import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import { getConfigValue, setConfig, setConfigValue } from './config';

const baseUrl = 'https://indreams.me';
const hmacSecret = 'gUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w';

export interface CookieStringObject { [key: string]: undefined | string | number | boolean};
export interface QueryStringObject { [key: string]: undefined | string | number | string[] | number[] };

function stringifyCookie(cookie: CookieStringObject) {
  if (!cookie)
    return '';
  return Object.entries(cookie).map(([key, value]) => {
    if (value === true)
      return key;
    return `${ key }=${ value }`;
  }).join('; ');
}

function parseCookieString(cookieString: string) {
  return cookieString.split('; ').reduce((cookieObject, item) => {
    const [key, value] = item.split(/\=(.+)/);
    cookieObject[key] = value !== undefined ? value : true;
    return cookieObject; 
  }, <Record<string, any>>{});
}

function parseSetCookie(setCookie: string[]) {
  const cookieParts = setCookie.map((part: string) => parseCookieString(part));
  return Object.assign.apply(null, [{}, ...cookieParts]);
}

function stringifyQuery(query: QueryStringObject) {
  if (!query) 
    return '';
  const queryArray = Object.entries(query).map(([key, value]) => {
    return `${ key }=${ encodeURIComponent(Array.isArray(value) ? value.join('+') : value) }`;
  });
  return queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
}

function parseJsonWebToken(token: string) {
  const parts = token.split('.').map(part => Buffer.from(part, 'base64').toString('ascii'));
  return {
    header: JSON.parse(parts[0]),
    payload: JSON.parse(parts[1]),
    signature: parts[2]
  }
}

function updateCookieFromResponse(response: AxiosResponse) {
  const headers = response.headers;
  if (headers['set-cookie']) {
    const newCookie = parseSetCookie(headers['set-cookie']);
    const oldCookie = getConfigValue('Cookie');
    setConfigValue('Cookie', {
      ...oldCookie,
      ...newCookie,
    });
  }
}

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

function jwtHeaders() {
  const cookie = getConfigValue('Cookie');
  return {
    'Cookie': stringifyCookie(cookie)
  }
}

export async function requestGet(endpoint: string, queryObject: QueryStringObject) {
  const path = endpoint + stringifyQuery(queryObject);
  return axios.get(`${ baseUrl }${ path }`, {
    headers: {
      ...jwtHeaders(),
      ...authHeaders(path, null)
    }
  })
  .then(response => {
    updateCookieFromResponse(response);
    return response;
  })
  .catch(error => error.response);
}

export async function requestPost(path: string, body: any) {
  return axios.post(`${ baseUrl }${ path }`, body, {
    headers: {
      ...jwtHeaders(),
      ...authHeaders(path, JSON.stringify(body))
    }
  })
  .then(response => {
    updateCookieFromResponse(response);
    return response;
  })
  .catch(error => error.response);
}

export async function requestPostAudio(path: string, filename: string, body: any) {
  const safeFilename = encodeURIComponent(filename);
  const timestamp = Math.round((new Date).getTime() / 1000);
  const hmac = crypto.createHmac('sha256', hmacSecret);
  hmac.update(safeFilename);
  hmac.update(path);
  hmac.update(timestamp.toString());
  const audioAuthHeaders = {
    'X-Auth': hmac.digest('hex'),
    'X-Ts': timestamp,
    'X-Filename': safeFilename
  };
  return axios.post(`${ baseUrl }${ path }`, body, {
    headers: {
      ...audioAuthHeaders,
      ...jwtHeaders(),
    }
  })
  .then(response => {
    updateCookieFromResponse(response);
    return response;
  })
  .catch(error => error.response)
}