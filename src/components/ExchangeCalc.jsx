import React, {useEffect, useState, useRef} from "react";
import "./exchangecalc.css";

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

	useEffect(() => {
		settoCurrencyData((prev) => ({
			...prev,
			value:
				(fromCurrencyData.value * fromCurrencyData.rate) / toCurrencyData.rate,
		}));
	}, [fromCurrencyData.value, fromCurrencyData.rate, toCurrencyData.rate]);

	return (
		<form>
			<div className="calcContainer">
				<label htmlFor="currencyFrom" style={{height: "100%"}}>
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
						value={fromCurrencyData.value}
						onChange={(e) => handleChangeValues(e, setfromCurrencyData)}
					/>
				</label>
			</div>

			<div className="calcContainer">
				<label htmlFor="currencyTo" style={{height: "100%"}}>
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
						value={toCurrencyData.value.toFixed(2)}
						disabled
					/>
				</label>
			</div>
		</form>
	);
}
