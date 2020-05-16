import React from 'react';
import './App.scss';
import TwitterBot from './components/TwitterBot';
import Container from '@material-ui/core/Container';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function App() {
	return (
		<div className="App">
			<RecoilRoot>
				<Container maxWidth="lg">
					<TwitterBot />
				</Container>
			</RecoilRoot>
		</div>
	);
}
export default App;
