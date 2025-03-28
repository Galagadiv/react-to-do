import React, {useEffect, useState} from "react";

import "./App.css";

function App() {
	const [rate, setRate] = useState([]);

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
		alert("Reloaded");
	};

	return (
		<div>
			<header>
				<h1>Курс валют</h1>
				<div style={{height: "100%"}}>
					<button onClick={() => fetchExchangeRate()}>Reload</button>
				</div>
			</header>
			<main>
				<ul>
					<li style={{backgroundColor: "#9198a3"}}>
						<div style={{display: "flex", textAlign: "center", gap: 5}}>
							<h3 style={{width: 100}}>$</h3>
							<h3>Назва валюти</h3>
						</div>
						<h3>Курс до грн.</h3>
					</li>

					{rate.map((el) => (
						<li>
							<div style={{display: "flex", textAlign: "center", gap: 5}}>
								<h3 style={{width: 100}}>{el.cc}</h3>
								<h3>{el.txt}</h3>
							</div>

							<h3>{el.rate}</h3>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;
