import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

class WeatherLineChart extends Component {
	render() {
		return (
			<ResponsiveContainer width='100%' aspect={7.0/3.0}>
				<LineChart data={this.props.data}
				  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
				  <CartesianGrid strokeDasharray="3 3" />
				  <XAxis dataKey="time" label={{ value: 'time', offset: -5, position: 'insideBottomRight' }} />
				  <YAxis dataKey="temperature" label={{ value: 'temperature(°F)', angle: -90, position: 'insideLeft' }} />
				  <Tooltip />
				  <Line type="monotone" dataKey="temperature" stroke="#8884d8" label={{ value: 'temperature', angle: -45, position: 'bottom'}} />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

WeatherLineChart.propTypes = {
	data: PropTypes.array
}

export default WeatherLineChart;