import React from 'react';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloseIcon from '@material-ui/icons/Close';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

class TwitterBot extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleTabState = this.handleTabState.bind(this);
	}

	state = {
		loaded: [],
		searched: [],
		searchedTicker: '',
		actveTab: '',
		addedTickers: [],
		tabValue: 0
	};

	async componentDidMount() {
		//Gathering data from heroku API I built and adding tweets to loaded array state
		let feed = await axios.get('https://boiling-plains-63502.herokuapp.com/twitter');
		let tweets = feed.data;
		this.setState({
			loaded: tweets
		});
	}

	handleChange = (e) => {
		//Watching input and changing searchedTicker string while typing
		this.setState({ searchedTicker: e.target.value });
	};

	handleTabChange = (event, newValue) => {
		//Selecting the correct tab
		console.log(newValue);
		this.setState({ tabValue: newValue });
	};

	handleTabState = (e, data) => {
		//This is changing searchedTicker state to the value of whichever tab is clicked
		console.log(data);
		this.setState({ searchedTicker: data.header, tabValue: data });
	};

	showAll = () => {
		//Clearing searched state
		this.setState({ searchedTicker: '' });
	};

	addTicker = () => {
		// Adding ticker to saved list
		console.log('running', this.state.addedTickers, this.state.searchedTicker);
		if (this.state.searchedTicker.length > 0) {
			const addedCopy = [ ...this.state.addedTickers ];
			addedCopy.push({
				header: this.state.searchedTicker,
				count: this.getCount()
			});
			this.setState({ addedTickers: addedCopy, searchedTicker: '' });
		} else {
			alert('Plase enter a symbol to search');
		}
	};
	removeTicker = (e, data) => {
		// Removing tab
		let tickers = this.state.addedTickers;
		if (tickers.filter((val) => val.header === data.header).length === 1) {
			tickers.shift();
			this.showAll();
			console.log('zero');
		} else {
			tickers.splice(tickers.indexOf(data));
			this.showAll();
		}
	};

	savedTickerFilter = (f) => {
		this.setState({ searchedTicker: f.target.value });
	};

	getCount = () => {
		//Copying loaded state and attempting to added individual numbers of tweets to each tab
		let copyOfLoaded = [ ...this.state.loaded ];
		let searchedTicker = this.state.searchedTicker.trim().toLowerCase();
		let filterCopy = copyOfLoaded.filter(function(i) {
			return i.text.toLowerCase().match(searchedTicker);
		});
		return filterCopy.length;
	};

	render() {
		//Trimming searched input to all lowercase and filtering displayed post within return based on search
		let loaded = this.state.loaded,
			searchedTicker = this.state.searchedTicker.trim().toLowerCase(),
			origLength = this.state.loaded.length;
		if (searchedTicker.length > 0) {
			loaded = loaded.filter(function(i) {
				return i.text.toLowerCase().match(searchedTicker);
			});
		}

		//let numOfTweets = this.getCount();
		console.log(this.state.tabValue);
		return (
			<div className="main" style={{ marginTop: 40 + 'px' }}>
				<h4>Search a stock symbol below to find relevant tweets from Stocktwitz.</h4>
				<h4>You may then press Add to Favorites to create a saved tab for later reference.</h4>
				<div className="main__inner">
					<TextField
						type="text"
						value={this.state.searchedTicker}
						onChange={this.handleChange}
						placeholder="Search Ticker..."
						id="outlined-basic"
						label="Search"
						variant="outlined"
					/>
					<Button onClick={this.addTicker} variant="contained" color="primary">
						Add to favorites <StarIcon style={{ marginLeft: 10 + 'px' }} />
					</Button>
				</div>
				{/* This will be the Filter Tabs component and that will import the list thats below the Paper component below */}{' '}
				<Paper square>
					<Tabs indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
						<Tab
							label={
								<div className="tabs-label">
									All (
									{this.state.searchedTicker !== '' && this.state.tabValue !== 0 ? (
										origLength
									) : (
										loaded.length
									)}
									)
								</div>
							}
							onClick={this.showAll}
						/>
						{//Mapping through tabs that are added in TwitterBot component and passed down as props to this component
						this.state.addedTickers.map((i) => {
							return (
								<div className="tab-container">
									<Tab
										label={
											<div className="tabs-label">
												{i.header}({i.count})
											</div>
										}
										key={i}
										onClick={(e) => this.handleTabState(e, i)}
									/>
									<CloseIcon value={i} onClick={(e) => this.removeTicker(e, i)} />
								</div>
							);
						})}
					</Tabs>
				</Paper>
				<List className="tweets">
					{loaded.map(function(i) {
						return (
							<ListItem key={i.id}>
								{' '}
								<TwitterIcon style={{ marginRight: 10 + 'px', color: '#1da1f2' }} />
								<Highlighter
									highlightClassName="YourHighlightClass"
									searchWords={[ searchedTicker ]}
									autoEscape={true}
									textToHighlight={i.text}
								/>
								,
							</ListItem>
						);
					})}
				</List>
			</div>
		);
	}
}
export default TwitterBot;
