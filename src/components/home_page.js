import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherOverview from './weather_overview';

class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row homepage-container justify-content-md-center">
          {this.props.cities.map(city => {
            return <WeatherOverview key={city.id} cityId={city.id} cityName={city.name} cityCountry={city.country} cityIcon={city.icon} />;
          })}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    cities: state.cities
  };
}

export default connect(mapStateToProps)(HomePage);
