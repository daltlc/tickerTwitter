import React, { Component } from 'react';
import axios from 'axios';

export default class StockTwitz extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, msg: null };
	}

	handleClick = (api) => (e) => {
		e.preventDefault();

		this.setState({ loading: true });
		axios
			.get('/lambda/' + api)
			.then((response) => response.json())
			.then((json) => this.setState({ loading: false, msg: json.msg }));
	};

	render() {
		const { loading, msg } = this.state;

		return (
			<p>
				<button onClick={this.handleClick('fetch-tweets')}>{loading ? 'Loading...' : 'Call Lambda'}</button>

				<span>{msg}</span>
			</p>
		);
	}
}
