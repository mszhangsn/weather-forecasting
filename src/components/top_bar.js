import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import weatherIcon from '../images/weather_icon.png';

class TopBar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <Link to="/" className="navbar-brand">
			  	<img src={weatherIcon} alt="weather application icon" width="40px" />
			  	Weather Forecasting
			  </Link>
			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			      	<Link to="/" className="nav-link">Home</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/newyork" className="nav-link">New York</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/sanfrancisco" className="nav-link">San Francisco</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/london" className="nav-link">London</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/amsterdam" className="nav-link">Amsterdam</Link>
			      </li>
			      <li className="nav-item">
			        <Link to="/sydney" className="nav-link">Sydney</Link>
			      </li>
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default TopBar;
