import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TopBar from './top_bar';
import HomePage from './home_page';
import WeatherForecastPage from './weather_forecast_page';
import NoMatchPage from './no_match_page';

const App = () => {
  return (
    <div>
      <TopBar />
      <Switch>
        <Route path="/:city" component={WeatherForecastPage} />
        <Route path="/" component={HomePage} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  );
}

export default App;
