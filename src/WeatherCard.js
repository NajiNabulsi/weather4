import React from 'react';
import { Link } from 'react-router-dom';

const Infoweather = ({ props, deleteItem }) => {
	const kelvinToCelcius = (kelvin) => {
		return (kelvin - 273).toFixed(2);
	};
	return (
		<div className="weCard">
			<Link to={`/${props.id}`}>
				<h3>
					{props.name} {props.sys.country}
				</h3>
			</Link>
			<button className="img" onClick={() => deleteItem(props.id)}>
				X
			</button>
			<div className="">
				<h5>{props.weather[0].main}</h5>
				<p> {props.weather[0].description} </p>
			</div>

			<p> min temp: {kelvinToCelcius(props.main.temp_min)} °C </p>
			<p> max temp: {kelvinToCelcius(props.main.temp_max)} °C </p>
			<p>
				location: {props.coord.lat} {props.coord.lon}
			</p>
		</div>
	);
};

export default Infoweather;