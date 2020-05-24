import React from 'react';
import './App.scss';
import TwitterBot from './components/TwitterBot';
import Container from '@material-ui/core/Container';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import StockTwitsMain from './components/StockTwitsMain';

function App() {
	return (
		<div className="App">
			<RecoilRoot>
				<Container maxWidth="lg">
					{/* <TwitterBot /> */}
					<StockTwitsMain />
				</Container>
			</RecoilRoot>
		</div>
	);
}
export default App;
