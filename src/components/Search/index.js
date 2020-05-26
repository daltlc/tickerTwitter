import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

function Search({ handleSearch, userInput, setUserInput, removeSymbol }) {
	const handleChange = (event) => {
		event.preventDefault();
		setUserInput(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.keyCode === 13) {
			handleSearch(event);
		}
	};
	return (
		<div className="search-main">
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 + 'px' }}>
				<SearchIcon />
				<InputBase
					className="ticker-input"
					onKeyDown={handleKeyPress}
					onChange={handleChange}
					placeholder="AAPL, TSLA"
					value={userInput}
				/>
			</div>
			<div>
				<Button variant="contained" color="primary" onClick={handleSearch}>
					Add Symbols
				</Button>
			</div>
		</div>
	);
}

Search.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	userInput: PropTypes.string.isRequired,
	setUserInput: PropTypes.func.isRequired
};

export default Search;
