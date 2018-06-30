import React, { Component } from 'react';

class OneDayForecast extends Component {

	// change date formate from 2018-1-1 to Jan 01
	changeDateFormat(date) {
		var day = date.split('-')[2];
		var month;
		switch(date.split('-')[1]) {
			case "01":
				month = "Jan";
				break;
			case "02":
				month = "Feb";
				break;
			case "03":
				month = "Mar";
				break;
			case "04":
				month = "Apr";
				break;
			case "05":
				month = "May";
				break;
			case "06":
				month = "Jun";
				break;
			case "07":
				month = "Jul";
				break;
			case "08":
				month = "Aug";
				break;
			case "09":
				month = "Sep";
				break;
			case "10":
				month = "Oct";
				break;
			case "11":
				month = "Nov";
				break;
			case "12":
				month = "Dec";
				break;
			default:
				return;
		}
		return `${month} ${day}`;
	}

	// calculate the main temperature
	calcMainTemp(list) {
		return Math.round(list.reduce((acc, curr) => {
			return (acc + curr.main.temp);
		},0) / list.length);
	}

	// find the minimal temperature of a day
	calcMinTemp(list) {
		return list.reduce((acc, curr) => {
			if (!acc) { 
				acc = curr.main.temp_min;
			}
			return Math.round(Math.min(acc, curr.main.temp_min));
		}, null);
	}

	// gather all weather descriptions in a day
	getWeatherDescription(data) {
		var descriptionSet = new Set();
		data.forEach(item => {
			descriptionSet.add(item.weather[0].description);
		});
		return Array.from(descriptionSet).join(" to ");
	}

	// find a weather icon for a day
	getWeatherIcon(data) {
		var weatherIcon;
		var hasDayIcon = data.some(item => {
			if(item.weather[0].icon.includes("d")){
				weatherIcon = item.weather[0].icon;
				return true;
			} else {
				return false;
			}
		});
		if (!hasDayIcon) {
			weatherIcon = data[0].weather[0].icon;
		}
		return weatherIcon;
	}

	render() {
		const { date, weather, handleClick } = this.props;
		return (
			<div onClick={() => handleClick(date)}>
				<h3>{this.changeDateFormat(date)} <img src={`http://openweathermap.org/img/w/${this.getWeatherIcon(weather)}.png`} alt="weather icon" /></h3>
				<p><span className="h4">{this.calcMainTemp(weather)}&deg;F</span> / {this.calcMinTemp(weather)}&deg;F</p>
				<p>{this.getWeatherDescription(weather)}</p>
			</div>
		);
	}
}

export default OneDayForecast;
