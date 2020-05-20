import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { selectedTabState } from './recoil/Atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloseIcon from '@material-ui/icons/Close';
import Highlighter from 'react-highlight-words';

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

	handleTabChange = (event, newValue) => {
		//Selecting the correct tab
		console.log(newValue);
		this.setState({ tabValue: newValue });
	};

	handleTabState = (e, data) => {
		//This is changing searchedTicker state to the value of whichever tab is clicked
		this.setState({ searchedTicker: data });
		console.log(data);
	};

	showAll = () => {
		//All tab
		this.setState({ searchedTicker: '' });
	};

	addTicker = () => {
		// Adding ticker to saved list
		this.setState((state) => {
			const tickers = state.addedTickers.push(state.searchedTicker);
			return {
				tickers,
				searchedTicker: ''
			};
		});
	};
	removeTicker = (e, data) => {
		let tickers = this.state.addedTickers;
		console.log(tickers.splice(tickers.indexOf(data)));
		// this.showAll();
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
				return i.text.toLowerCase().match(searchedTicker);
			});
		}
		return (
			<div className="main" style={{ marginTop: 40 + 'px' }}>
				<div className="main__inner">
					<TextField
						type="text"
						value={this.state.searchedTicker}
						onChange={this.handleChange}
						placeholder="Type here..."
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
					<Tabs
						value={this.state.tabValue}
						indicatorColor="primary"
						textColor="primary"
						onChange={this.handleTabChange}
					>
						<Tab label={<div>All ({loaded.length})</div>} onClick={this.showAll} />
						{//Mapping through tabs that are added in TwitterBot component and passed down as props to this component
						this.state.addedTickers.map((i) => {
							return (
								<Tab
									label={
										<div>
											{i}
											({loaded.length})
										</div>
									}
									key={i}
									onClick={(e) => this.handleTabState(e, i)}
								/>
								/* This will remove the tab and switch back to all tab /*
								/* <CloseIcon value={i} onClick={(e) => this.removeTicker(e, i)} /> */
								/*This will splice the loaded array above with the tab selected and then return the length of array giving how many tweets are within each ticker search */
								/* <p> {this.state.loaded.splice(i).length}</p> */
							);
						})}
					</Tabs>
				</Paper>
				{/* This List needs to be a child functional component that gets passed an array  */}
				<List className="tweets">
					{loaded.map(function(i) {
						return (
							<ListItem key={i.id}>
								{' '}
								<TwitterIcon style={{ marginRight: 10 + 'px' }} />
								<Highlighter
									highlightClassName="YourHighlightClass"
									searchWords={[ searchedTicker ]}
									autoEscape={true}
									textToHighlight={i.text}
								/>,
								{/* {i.text} */}
							</ListItem>
						);
					})}
				</List>
			</div>
		);
	}
}
export default TwitterBot;
