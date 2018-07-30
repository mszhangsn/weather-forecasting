import React, { Component } from 'react';

import WeatherOverview from './weather_overview';
import Cities from './cities';

class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row homepage-container justify-content-md-center">
          {Cities.map(city => {
            return <WeatherOverview key={city.id} cityId={city.id} cityName={city.name} cityCountry={city.country} cityIcon={city.icon} />;
          })}
        </div>
      </div>
    );
  }
};

export default HomePage;
