import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeatherIcons from './weather_icons';

class OneDayForecast extends Component {

  // change date formate from 2018-1-1 to Jan 01
  changeDateFormat(date) {
    var day = date.split('-')[2];
    var month;
    switch(date.split('-')[1]) {
      case "01": month = "Jan"; break;
      case "02": month = "Feb"; break;
      case "03": month = "Mar"; break;
      case "04": month = "Apr"; break;
      case "05": month = "May"; break;
      case "06": month = "Jun"; break;
      case "07": month = "Jul"; break;
      case "08": month = "Aug"; break;
      case "09": month = "Sep"; break;
      case "10": month = "Oct"; break;
      case "11": month = "Nov"; break;
      case "12": month = "Dec"; break;
      default: return;
    }
    return `${month} ${day}`;
  }

  getDayofWeek(date) {
    // get one day before the date
    var day = new Date(date);
    var result;
    switch(day.getDay()){
      case 0: result = "Mon"; break;
      case 1: result = "Tue"; break;
      case 2: result = "Wed"; break;
      case 3: result = "Thu"; break;
      case 4: result = "Fri"; break;
      case 5: result = "Sat"; break;
      case 6: result = "Sun"; break;
      default: return;
    }
    return result; 
  }

  // calculate the main temperature
  // calcMainTemp(list) {
  //  return Math.round(list.reduce((acc, curr) => {
  //    return (acc + curr.main.temp);
  //  },0) / list.length);
  // }

  // find the maximal temperature of a day
  calcMaxTemp(list) {
    return list.reduce((acc, curr) => {
      if (!acc) { 
        acc = curr.main.temp_max;
      }
      return Math.round(Math.max(acc, curr.main.temp_max));
    }, null);
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
    var iconId, icon;
    var hasDayIcon = data.some(item => {
      if(item.weather[0].icon.includes("d")){
        iconId = item.weather[0].icon;
        return true;
      } else {
        return false;
      }
    });
    if (!hasDayIcon) {
      iconId = data[0].weather[0].icon;
    }
    WeatherIcons.forEach(item => {
      if (item.id === iconId) {
        icon = item.icon;
      }
    });
    return icon;
  }

  render() {
    const { date, weather, handleClick } = this.props;
    return (
      <div onClick={() => handleClick(date)}>
        <h3>{this.changeDateFormat(date)} {this.getDayofWeek(date)}</h3>
        <p><span className="h3">{this.calcMaxTemp(weather)}&deg;F</span> / {this.calcMinTemp(weather)}&deg;F</p>
        <p><img src={this.getWeatherIcon(weather)} alt="weather icon" width="80px" /></p>
        <p>{this.getWeatherDescription(weather)}</p>
      </div>
    );
  }
}

OneDayForecast.propTypes = {
  date: PropTypes.string,
  weather: PropTypes.array,
  handleClick: PropTypes.func
}

export default OneDayForecast;

