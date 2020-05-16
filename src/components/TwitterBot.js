import axios from 'axios';
import React from 'react';

class TwitterBot extends React.Component {
	state = {
		loaded: [],
		searched: []
	};
	async componentDidMount() {
		//Gathering data from heroku API I built and adding tweets to loaded array state
		let feed = await axios.get('https://boiling-plains-63502.herokuapp.com/');
		let tweets = feed.data;
		this.setState({
			loaded: tweets
		});
	}
	render() {
		return <div>{this.state.loaded.map((tweet, index) => <p key={index}>{tweet.text}</p>)}</div>;
	}
}
export default TwitterBot;
