import axios from 'axios';
import React from 'react';
import FilterTabs from './FilterTabs';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class TwitterBot extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		loaded: [],
		searched: [],
		searchedTicker: '',
		addedTickers: []
	};

	async componentDidMount() {
		//Gathering data from heroku API I built and adding tweets to loaded array state
		let feed = await axios.get('https://boiling-plains-63502.herokuapp.com/');
		let tweets = feed.data;
		this.setState({
			loaded: tweets
		});
	}
	handleChange = (e) => {
		//Watching input and changing searchedTicker string while typing
		this.setState({ searchedTicker: e.target.value });
	};
	addTicker = () => {
		//Adding ticker to saved list
		this.setState((state) => {
			const tickers = state.addedTickers.push(state.searchedTicker);
			return {
				tickers,
				searchedTicker: ''
			};
		});
	};
	removeTicker = () => {
		this.setState((state) => {});
	};

	savedTickerFilter = (f) => {
		this.setState({ searchedTicker: f.target.value });
	};

	render() {
		//Trimming searched input to all lowercase and filtering displayed post within return based on search
		let loaded = this.state.loaded,
			searchedTicker = this.state.searchedTicker.trim().toLowerCase();
		if (searchedTicker.length > 0) {
			loaded = loaded.filter(function(i) {
				console.log('typing..');
				return i.text.toLowerCase().match(searchedTicker);
			});
		}
		return (
			<div class="main" style={{ marginTop: 40 + 'px' }}>
				<div class="main__inner">
					<TextField
						type="text"
						value={this.state.searchedTicker}
						onChange={this.handleChange}
						placeholder="Type here..."
						id="outlined-basic"
						label="Search"
						variant="outlined"
					/>

					{/* <input
					type="text"
					value={this.state.searchedTicker}
					onChange={this.handleChange}
					placeholder="Type here..."
				/> */}
					<Button onClick={this.addTicker} variant="contained" color="primary">
						Add to favorites <StarIcon style={{ marginLeft: 10 + 'px' }} />
					</Button>
				</div>

				<FilterTabs />
				<p>{this.state.addedTickers}</p>
				<List>
					{loaded.map(function(i) {
						return <ListItem>{i.text}</ListItem>;
					})}
				</List>
			</div>
		);
	}
}
export default TwitterBot;
