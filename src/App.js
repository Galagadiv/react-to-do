import React, {useEffect, useState} from "react";

import "./App.css";

function App() {
	const [rate, setRate] = useState([]);
	const [fromCurrency, setFromCurrency] = useState({
		rate: 0,
		value: 0,
		txt: "",
	});
	const [toCurrency, setToCurrency] = useState({
		rate: 0,
		value: 0,
		txt: "",
	});

	const handelChangeValues = () => {};

	useEffect(() => {
		fetchExchangeRate();
	}, []);

	const fetchExchangeRate = async () => {
		fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setRate(data);
			});
	};

	// useEffect(() => {}, fromCurrency.value);

	return (
		<div>
			<header>
				<h1>Курс валют</h1>
				<div style={{height: "100%"}}>
					<button onClick={() => fetchExchangeRate()}>Reload</button>
				</div>
			</header>
			<main>
				<form onSubmit={() => {}}>
					<div className="calcContainer">
						<label htmlFor="currencyFrom" style={{height: "100%"}}>
							Валюта:
							<select>
								{rate.map((el) => (
									<option>{el.txt}</option>
								))}
							</select>
						</label>
						<label htmlFor="valueFrom">
							Значення:
							<input
								type="number"
								value={fromCurrency.value}
								onChange={() => setFromCurrency.value}
							/>
						</label>
					</div>

					<div className="calcContainer">
						<label htmlFor="currencyTo" style={{height: "100%"}}>
							Валюта:
							<select>
								{rate.map((el) => (
									<option>{el.txt}</option>
								))}
							</select>
						</label>
						<label htmlFor="valueTo">
							Значення:
							<input
								value={toCurrency.value}
								onChange={() => setToCurrency()}
								disabled
							/>
						</label>
					</div>
				</form>

				<ul>
					<li key={1} style={{backgroundColor: "#9198a3"}}>
						<div style={{display: "flex", textAlign: "center", gap: 5}}>
							<h3 style={{width: 100}}>$</h3>
							<h3>Назва валюти</h3>
						</div>
						<h3>Курс до грн.</h3>
					</li>

					{rate.map((el) => (
						<li key={el.cc}>
							<div style={{display: "flex", textAlign: "center", gap: 5}}>
								<h3 style={{width: 100}}>{el.cc}</h3>
								<h3>{el.txt}</h3>
							</div>
							<div
								style={{alignItems: "start", display: "flex", width: "80px"}}
							>
								<h3>{el.rate.toFixed(2)}</h3>
							</div>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;
