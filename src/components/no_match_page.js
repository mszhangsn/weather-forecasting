import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatchPage extends Component {
	render() {
		return (
			<div className="no-match-page-container">
				<h1>Not Found</h1>
				<Link to="/">Back to Home Page</Link>
			</div>
		);
	}
}

export default NoMatchPage;