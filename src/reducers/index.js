import { combineReducers } from 'redux';

import Cities from './cities';
import WeatherIcons from './weather_icons';
import Weather from './weather';

const rootReducer = combineReducers({
  cities: Cities,
  icons: WeatherIcons,
  weather: Weather
});

export default rootReducer;

