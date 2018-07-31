import { FETCH_CURRENT_WEATHER, FETCH_FIVEDAY_FORECAST } from '../actions';

const Weather = (state={}, action) => {
  switch(action.type) {
    case FETCH_CURRENT_WEATHER:
      const currentWeather = action.payload.data;
      return {
        description: currentWeather.weather[0].description,
        weatherIcon: currentWeather.weather[0].icon,
        temperature: Math.round(currentWeather.main.temp),
        wind: currentWeather.wind.speed
      };
    case FETCH_FIVEDAY_FORECAST:
      return action.payload.data.list;
    default:
      return state;
  }
};

export default Weather;

