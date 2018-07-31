import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchCurrentWeather } from '../actions';

class WeatherOverview extends Component {

  componentDidMount() {
    // fetch current weather data from OpenWeatherMap API
    this.props.fetchCurrentWeather(this.props.cityId).then(() => {
      this.setState(this.props.weather);
    });
  }

  // find the right weather icon according to the icon code in OpenWeatherMap API
  displayWeatherIcon(id) {
    var result;
    this.props.icons.forEach(item => {
      if (item.id === id) {
        result = item.icon;
      }
    });
    return result;
  }

  // convert mps to mph and then get wind description according to wind speed
  calcWindScale(speed) {
    var windSpeed = Math.round(speed * 2.23694);
    if (windSpeed < 1)
    var description;
    switch(true) {
      case (windSpeed < 1 ): description = "calm"; break;
      case (1 <= windSpeed && windSpeed <= 3 ): description = "light air"; break;
      case (4 <= windSpeed && windSpeed <= 7 ): description = "light breeze"; break;
      case (8 <= windSpeed && windSpeed <= 12 ): description = "gentle breeze"; break;
      case (13 <= windSpeed && windSpeed <= 18 ): description = "moderate breeze"; break;
      case (19 <= windSpeed && windSpeed <= 24 ): description = "fresh breeze"; break;
      case (25 <= windSpeed && windSpeed <= 31 ): description = "strong breeze"; break;
      case (32 <= windSpeed && windSpeed <= 38 ): description = "high wind, moderate gale, near gale"; break;
      case (39 <= windSpeed && windSpeed <= 46 ): description = "gale, fresh gale"; break;
      case (47 <= windSpeed && windSpeed <= 54 ): description = "strong/severe gale"; break;
      case (55 <= windSpeed && windSpeed <= 63 ): description = "storm, whole gale"; break;
      case (64 <= windSpeed && windSpeed <= 72 ): description = "violent storm"; break;
      case (windSpeed >= 73 ): description = "hurricane force"; break;
      default: return;
    }
    return description;
  }

  render() {
    if (!this.state) {
      return <div className="loading"></div>;
    }
    return (
      <div className="col-lg-3 col-md-4 col-sm city-overview-container border rounded">
        <img src={this.displayWeatherIcon(this.state.weatherIcon)} alt="weather icon" width="70px" className="weather-icon" />
        <h3 className="city-temperature">{this.state.temperature}&deg;F</h3>
        <div className="col"><img width="180px" src={this.props.cityIcon} alt={`${this.props.cityName} icon`} /></div>
        <div className="col">
          <h4>{this.props.cityName}, {this.props.cityCountry}</h4>
          <p>{this.state.description}, {this.calcWindScale(this.state.wind)}</p>
          <Link to={`/${this.props.cityName.replace(/\s/g, '').toLowerCase()}`} className="link"><p>&gt;&gt;&gt; Tell me more !</p></Link>
        </div>
      </div>
    );
  }
};

WeatherOverview.propTypes = {
  cityId: PropTypes.number,
  cityName: PropTypes.string,
  cityCountry: PropTypes.string,
  cityIcon: PropTypes.string
}

function mapStateToProps(state) {
  return {
    icons: state.icons,
    weather: state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherOverview);

