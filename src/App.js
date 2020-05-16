import React from 'react';
import './App.scss';
import TwitterBot from './components/TwitterBot';
import Container from '@material-ui/core/Container';

function App() {
	return (
		<div className="App">
			<Container maxWidth="lg">
				<TwitterBot />
			</Container>
		</div>
	);
}
export default App;
