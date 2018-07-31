import axios from 'axios';

export const FETCH_CURRENT_WEATHER = 'fetch_current_weather';
export const FETCH_FIVEDAY_FORECAST = 'fetch_fiveday_forecast';

const APIkey = '2d0db4754e2a0996f49bb80d1d577639';

export function fetchCurrentWeather(cityId) {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&appid=${APIkey}`);
  return {
    type: FETCH_CURRENT_WEATHER,
    payload: request
  };
}

export function fetchFivedayForecast(cityId) {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial&appid=${APIkey}`);
  return {
    type: FETCH_FIVEDAY_FORECAST,
    payload: request
  };
}