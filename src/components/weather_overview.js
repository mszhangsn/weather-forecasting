import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import APIkey from './APIkey';
import WeatherIcons from './weather_icons';

class WeatherOverview extends Component {

	constructor(props) {
		super(props);
		this.state = null;
	}

	componentDidMount() {
		// fetch current weather data from OpenWeatherMap API
		axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${this.props.cityId}&units=imperial&appid=${APIkey}`)
			.then( response => {
				this.setState({	
					description: response.data.weather[0].description,
					weatherIcon: response.data.weather[0].icon,
					temperature: Math.round(response.data.main.temp),
					pressure: response.data.main.pressure,
					humidity: response.data.main.humidity,
					wind: response.data.wind.speed,
					cloudiness: response.data.clouds.all
				});
			})
			.catch(error => {
		    console.log(error);
		  });
	}

	// find the right weather icon according to the icon code in OpenWeatherMap API
	displayWeatherIcon(id) {
		var result;
		WeatherIcons.forEach(item => {
			if (item.id === id) {
				result = item.icon;
			}
		});
		return result;
	}

	render() {
		if (!this.state) {
			return <div className="loading"></div>;
		}
		return (
			<div className="col-lg-3 col-md-4 col-sm city-overview-container border rounded">
				<img src={this.displayWeatherIcon(this.state.weatherIcon)} alt="weather icon" width="80px" className="weather-icon" />
				<div className="col"><img width="180px" src={this.props.cityIcon} alt={`${this.props.cityName} icon`} /></div>
				<div className="col">
					<br />
					<h4>{this.props.cityName}, {this.props.cityCountry}</h4>
					<h3>{this.state.temperature}&deg;F <span className="h4">{this.state.description}</span></h3>
					<br />
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

export default WeatherOverview;

