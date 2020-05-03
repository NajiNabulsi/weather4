import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import Button from './Button';
import Search from './Search';
import Chart from './Chart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  const [ cities, setCities ] = useState([]);
	const [ message, setMessage ] = useState(' Please enter a valid City Name ');
	const [ isLoading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const [ inputValue, setInputValue ] = useState('');

  

	const getCity = async (city) => {
		setLoading(true);
		setMessage('');
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
			if (response.ok) {
				const data = await response.json();
				const listItems = cities.filter((item) => item.id !== data.id);
				setCities([ data, ...listItems ]);
				setLoading(false);
				setError('');
			} else {
				setError('City name not found...');
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setError('Something wrong...');
		}
	};

	const handelSearch = (e) => {
		setInputValue(e.target.value);
	};
	const handelButton = (e) => {
		e.preventDefault();
		getCity(inputValue);
	};
	const deleteItem = (id) => {
		const filterd = cities.filter((city) => city.id !== id);
		setCities(filterd);
	};

	return (
		<Router>
			<div className="container">
				<h1>Weather</h1>
				<Switch>
					<Route exact path="/">
						<h3 className="message">{message}</h3>
						<form className="">
							<Search handelSearch={handelSearch} />
							<Button handelButton={handelButton} />
						</form>

						{error && <h2 className="message">{error}</h2>}
						{isLoading && <h1> Loading...</h1>}
						<ul>
							{cities.map((city) => <WeatherCard props={city} key={city.id} deleteItem={deleteItem} />)}
						</ul>
					</Route>
					<Route path="/:id">
						<Chart />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};


export default App;
