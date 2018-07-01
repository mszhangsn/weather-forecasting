import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import APIkey from './APIkey';
import Cities from './cities';
import OneDayForecast from './one_day_forecast';
import WeatherLineChart from './weather_line_chart';
import NoMatchPage from './no_match_page';

class WeatherForecastPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.setNewState = this.setNewState.bind(this);
		this.checkIfCityExist = this.checkIfCityExist.bind(this);
		this.getCityInfo = this.getCityInfo.bind(this);
		this.onHandleClick = this.onHandleClick.bind(this);
		this.fetchDailyData = this.fetchDailyData.bind(this);
		this.isActiveDate = this.isActiveDate.bind(this);
	}

	componentDidMount() {
		if (this.checkIfCityExist()) {
			this.setNewState();
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.city !== this.props.match.params.city) {
      this.setState({fiveDaysData: [], lineChartData: [], activeDate: []});
      this.setNewState();
    }
	}

	// fetch 5-day forecast data from OpenWeatherMap API
	fetchFiveDayForecastData() {
		var cityInfo = this.getCityInfo();
		return axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityInfo.id}&units=imperial&appid=${APIkey}`);
	}

	// create a new fiveDaysData array and set the second day as the default active date in weather line chart
	setNewState(response) {
		this.fetchFiveDayForecastData().then(response => {
			var weatherLists = response.data.list;
			var days = [weatherLists[0].dt_txt.split(' ')[0], weatherLists[8].dt_txt.split(' ')[0], weatherLists[16].dt_txt.split(' ')[0], weatherLists[24].dt_txt.split(' ')[0], weatherLists[32].dt_txt.split(' ')[0]];
			var fiveDaysData = {};
			days.forEach(day => {
				fiveDaysData[day] = weatherLists.filter(item => {
					if (item.dt_txt.split(' ')[0] === day) {
						return true;
					} else {
						return false;
					}
				});
			});
			var lineChartData = this.fetchHourlyData(fiveDaysData[Object.keys(fiveDaysData)[1]]);
			var activeDate = Object.keys(fiveDaysData)[1];
			this.setState({fiveDaysData, lineChartData, activeDate});
		}).catch(error => {
	    console.log(error);
	  });
	}

	// check if the city is one of the five cities of this application
	checkIfCityExist() {
		return Cities.some(item => {
			return this.props.match.params.city === item.name.replace(/\s/g, '').toLowerCase();
		});
	}

	// get the information of this city
	getCityInfo() {
		var cityInfo = {};
		Cities.forEach(item => {
			if(this.props.match.params.city === item.name.replace(/\s/g, '').toLowerCase()){
				cityInfo.name = item.name;
				cityInfo.country = item.country;
				cityInfo.id = item.id;
			}
		});
		return cityInfo;
	}

	// handle event when user click one day among five days
	onHandleClick(key) {
		var lineChartData = this.fetchHourlyData(this.state.fiveDaysData[key]);
		var activeDate = key;
		this.setState({lineChartData, activeDate});
		window.scrollTo(0, ReactDOM.findDOMNode(this.refs.linechart).offsetTop);
	}

	// fetch hourly data
	fetchHourlyData(data) {
		var time, temperature;
		return data.reduce((acc,curr) => {
			time = curr.dt_txt.split(' ')[1].split(":",2).join(":");
			temperature = curr.main.temp;
			acc.push({time, temperature});
			return acc;
		},[]);
	}

	// fetch daily data
	fetchDailyData() {
		return Object.keys(this.state.fiveDaysData).map(day => {
			return (
				<div className={`col-lg-2 col-md-4 col-sm-5 border rounded one-day-container ${this.isActiveDate(day)?"active-day":"not-active-day"}`} key={this.state.fiveDaysData[day][0].dt}>
					<OneDayForecast 
						date={day}
						weather={this.state.fiveDaysData[day]} 
						handleClick={this.onHandleClick}
					/>
				</div>
			);
		})		
	}

	isActiveDate(day) {
		return day === this.state.activeDate;
	}

	render() {
		if (!this.checkIfCityExist()) {
			return <NoMatchPage />;
		}
		if (!this.state.fiveDaysData) {
			return <div className="loading"></div>;
		}
		return (
			<div className="weather-forecast-page-container">
				<div className="daily-weather-container row justify-content-md-center">
					{ this.fetchDailyData() }
				</div>
				<h3 className="text-center title">Hourly forecasting on {this.state.activeDate} in {this.getCityInfo().name}, {this.getCityInfo().country}</h3>
				<div className="hourly-weather-container" ref="linechart">
					<WeatherLineChart data={this.state.lineChartData} />
				</div>
			</div>
		);
	}
};

WeatherForecastPage.propTypes = {
	match: PropTypes.shape({
    params: PropTypes.shape({
      city: PropTypes.string
    })
  })
}

export default WeatherForecastPage;