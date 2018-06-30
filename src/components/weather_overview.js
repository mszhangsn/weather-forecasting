import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIkey from '../APIkey';

class WeatherOverview extends Component {

	constructor(props) {
		super(props);
		this.state = null;
	}

	componentDidMount() {
		// fetch current weather data from OpenWeatherMap API
		axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${this.props.cityId}&units=imperial&appid=${APIkey}`)
			.then( response => {
				console.log(response);
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

	render() {
		if (!this.state) {
			return <div className="loading"></div>;
		}
		return (
			<div>
				<p>{this.state.temperature}&deg;F {this.state.description}<img src={`http://openweathermap.org/img/w/${this.state.weatherIcon}.png`} alt="weather icon" /></p>
				<p>Wind: {this.state.wind} m/h, Cloudiness: {this.state.cloudiness}%</p>
				<p>Pressure: {this.state.pressure} hpa, Humidity: {this.state.humidity}%</p>
				<Link to={`/${this.props.cityName.replace(/\s/g, '').toLowerCase()}`} className="link"><p>&gt;&gt;&gt; See 5 day forecast</p></Link>
			</div>
		);
	}
};

export default WeatherOverview;
