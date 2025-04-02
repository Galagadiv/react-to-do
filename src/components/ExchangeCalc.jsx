import React, {useEffect, useState, useRef} from "react";
import "./exchangecalc.css";
import logo from "../assets/second-revert-icon.svg";

const initState = {
	rate: 1,
	value: 0,
	txt: "",
};

export default function ExchangeCalc({rate = initState}) {
	const fromCurrencySelectRef = useRef();
	const toCurrencySelectRef = useRef();

	const [fromCurrencyData, setfromCurrencyData] = useState(initState);
	const [toCurrencyData, settoCurrencyData] = useState(initState);

	const handleChangeValues = (e, setState) => {
		const {name, value} = e.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = () => {
		const fromObj = rate.find(
			(el) => el.cc === fromCurrencySelectRef.current.value
		);
		const toObj = rate.find(
			(el) => el.cc === toCurrencySelectRef.current.value
		);

		setfromCurrencyData((prev) => ({
			...prev,
			txt: fromObj.txt,
			rate: fromObj.rate,
		}));

		settoCurrencyData((prev) => ({
			...prev,
			txt: toObj.txt,
			rate: toObj.rate,
		}));
	};

	const handleRevertValues = (event) => {
		event.preventDefault();

		const temp = fromCurrencyData;
		setfromCurrencyData(toCurrencyData);
		settoCurrencyData(temp);
	};

	// Оновлення другого input
	useEffect(() => {
		settoCurrencyData((prev) => ({
			...prev,
			value: (
				(fromCurrencyData.value * fromCurrencyData.rate) /
				toCurrencyData.rate
			).toFixed(2),
		}));
	}, [fromCurrencyData.value, fromCurrencyData.rate, toCurrencyData.rate]);

	return (
		<form onSubmit={handleRevertValues}>
			<div className="calcContainer">
				<label htmlFor="currencyFrom">
					Валюта:
					{/* Не можливо передати одразу об'єкт el як значення при виборі, бо
            		він конвертується в рядок "[object Object]", зате приймається число або рядок*/}
					<select ref={fromCurrencySelectRef} onChange={handleSelectChange}>
						{rate.map((el) => (
							<option key={el.cc} value={el.cc}>
								{el.txt}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="valueFrom">
					Значення:
					<input
						type="number"
						name="value"
						value={+fromCurrencyData.value || 0}
						onChange={(e) => handleChangeValues(e, setfromCurrencyData)}
					/>
				</label>
			</div>

			<button type="submit" style={{maxWidth: 40, maxHeight: 40}}>
				<img src={logo} alt="Обміняти" />
			</button>

			<div className="calcContainer">
				<label htmlFor="currencyTo">
					Валюта:
					<select ref={toCurrencySelectRef} onChange={handleSelectChange}>
						{rate.map((el) => (
							<option key={el.cc} value={el.cc}>
								{el.txt}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="valueTo">
					Значення:
					<input
						type="number"
						name="value"
						value={toCurrencyData.value ? toCurrencyData.value : 0}
						disabled
					/>
				</label>
			</div>
		</form>
	);
}
