/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get('/dev/api/get-auth-url');
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());
  return result;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = '/dev/api/get-events' + '/' + token;
    const result = await axios.get(url);
    if (result.data) {
      let locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

const removeQuery = () => {
  var newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

//getToken with try..catch statements
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch('/dev/api/token' + '/' + encodeCode, {
      headers: {
        'Content-Type': 'application/json',
        mode: 'no-cors',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem('access_token', access_token);
  } catch (error) {
    //error.json();

    console.table({ error });
  }
};

export const extractLocations = (events) => {
  if (events === undefined) return [];
  const locations = events.map((event) => event.location);
  return [...new Set(locations)];
};
