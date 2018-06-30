import React, { Component } from 'react';

import WeatherOverview from './weather_overview';
import Cities from './cities';

class HomePage extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row homepage-container justify-content-md-center">
					{Cities.map(city => {
						return (
							<div className="col-lg-3 col-md-4 col-sm city-overview-container border rounded" key={city.id}>
								<div className="col"><img width="200px" src={city.icon} alt={`${city.name} icon`} /></div>
								<div className="col">
									<h3>{city.name}, {city.country}</h3>
									<WeatherOverview cityId={city.id} cityName={city.name} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
};

export default HomePage;
