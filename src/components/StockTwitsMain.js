import React, { useState } from 'react';
import axios from 'axios';
import { omit } from 'lodash';

import { buildBatchRequest, getSymbolMap } from '../helper/helpers';

import Search from './Search';
import Content from './Content';
import TickerList from './TickerList';

function StockTwitsMain() {
	//Using React hooks to hold state
	const [ userInput, setUserInput ] = useState('');
	const [ activeSymbol, setActiveSymbol ] = useState('');
	const [ master, setMaster ] = useState({});
	const selection = master[activeSymbol];

	//This will run our buildBatchRequest function we imported from our helper.js
	const handleSearch = (event) => {
		event.preventDefault();
		const requests = buildBatchRequest(userInput);
		Promise.all(requests).then((data) => {
			const newMap = getSymbolMap(data);
			setMaster({ ...master, ...newMap });
			setUserInput('');
		});
	};
	//This will remove the symbol from our ticker list
	const removeSymbol = (id) => {
		const newMap = omit(master, id);
		setMaster(newMap);
		if (id === activeSymbol) {
			setActiveSymbol('');
		}
	};

	return (
		<div>
			<Search
				activeSymbol={activeSymbol}
				handleSearch={handleSearch}
				master={master}
				userInput={userInput}
				setActiveSymbol={setActiveSymbol}
				setUserInput={setUserInput}
			/>
			<TickerList
				activeSymbol={activeSymbol}
				master={master}
				setActiveSymbol={setActiveSymbol}
				removeSymbol={removeSymbol}
			/>

			<Content master={master} selection={selection} />
		</div>
	);
}

export default StockTwitsMain;
