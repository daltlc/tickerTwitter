import axios from 'axios';
import React from 'react';

class TwitterBot extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	state = {
		loaded: [],
		searched: [],
		searchedTicker: ''
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
	render() {
		//Trimming searched input to all lowercase and filtering displayed post based on search
		let loaded = this.state.loaded,
			searchedTicker = this.state.searchedTicker.trim().toLowerCase();
		if (searchedTicker.length > 0) {
			loaded = loaded.filter(function(i) {
				console.log('typing..');
				return i.text.toLowerCase().match(searchedTicker);
			});
		}
		return (
			<div>
				<input
					type="text"
					value={this.state.searchedTicker}
					onChange={this.handleChange}
					placeholder="Type here..."
				/>
				<ul>
					{loaded.map(function(i) {
						return <li>{i.text}</li>;
					})}
				</ul>
			</div>
		);
	}
}
export default TwitterBot;
