import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import TopBar from './components/top_bar';
import HomePage from './components/home_page';
import WeatherForecastPage from './components/weather_forecast_page';
import NoMatchPage from './components/no_match_page';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<TopBar />
			<Switch>
				<Route path="/:city" component={WeatherForecastPage} />
				<Route path="/" component={HomePage} />
				<Route component={NoMatchPage} />
			</Switch>
		</div>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();

