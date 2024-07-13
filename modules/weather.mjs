import { doGET } from "./fetch.mjs";

import { WEATHER_API_URL } from '../constants.mjs'

export const getSearchString = (place) => {
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!API_KEY) {
    throw new Error('API Key not provided');
  }

  return `${WEATHER_API_URL}?key=${API_KEY}&q=${encodeURIComponent(
    place || DEFAULT_PLACE
  )}&aqi=yes`;
};

const fetchJson = async (url, options) => {
  return await doGET(url, options);
};


export const fetchWeather = async (place) => {
  const searchURL = getSearchString(place);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await fetchJson(searchURL, options);
};