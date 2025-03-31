import React from "react";
import "./currencylist.css";

export default function CurrencyList({
	rate = {rate: "Помилка", value: "при", txt: "завантаженні"},
}) {
	return (
		<ul>
			<li key={1} className="list__header">
				<div className="containerCollumnName">
					<h3 className="CollumnAbbreviation">$</h3>
					<h3>Назва валюти</h3>
				</div>
				<h3>Курс до грн.</h3>
			</li>

			{rate.map((el) => (
				<li key={el.cc}>
					<div className="containerCollumnName">
						<h3 className="CollumnAbbreviation">{el.cc}</h3>
						<h3>{el.txt}</h3>
					</div>
					<div className="CollumnExRate">
						<h3>{el.rate.toFixed(2)}</h3>
					</div>
				</li>
			))}
		</ul>
	);
}
