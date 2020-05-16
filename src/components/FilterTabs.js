import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { selectedTabState } from './recoil/Atoms';

export default function DisabledTabs(props) {
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [ tab, setTab ] = useRecoilState(selectedTabState);
	// const selectTab = (i) => setTab(i);

	return (
		<Paper square>
			<Tabs
				value={value}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
				aria-label="disabled tabs example"
			>
				<Tab label="All" />
				{//Mapping through tabs that are added in TwitterBot component and passed down as props to this component
				props.tabs.map((i) => {
					return <Tab onClick={() => setTab(i)} label={i} />;
				})}
			</Tabs>
		</Paper>
	);
}
