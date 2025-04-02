import React, {useEffect, useState} from "react";

import "./App.css";
import CurrencyList from "./components/CurrencyList";
import ExchangeCalc from "./components/ExchangeCalc";

function App() {
	const [rate, setRate] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
			);
			const data = await response.json();
			console.log(data);
			setRate(data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<header>
				<section>
					<h1>Курс валют</h1>
				</section>
			</header>
			<main>
				<section>
					<ExchangeCalc rate={rate} />
					<CurrencyList rate={rate} />
				</section>
			</main>
		</div>
	);
}

export default App;
