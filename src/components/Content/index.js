import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import NoSelection from '../NoSelection';
import ActiveSelection from '../ActiveSelection';

const Content = ({ master, selection }) => {
	const activeContent = (() => {
		if (isEmpty(master)) return <div style={{ color: 'black' }}>Please enter a stock symbol above</div>;
		if (isEmpty(selection))
			return (
				<div style={{ color: 'black' }}>
					<NoSelection master={master} />
				</div>
			);

		return (
			<div style={{ color: 'black' }}>
				<ActiveSelection data={selection} />
			</div>
		);
	})();

	return (
		<main>
			<div>{activeContent}</div>
		</main>
	);
};

Content.propTypes = {
	master: PropTypes.shape({}).isRequired,
	selection: PropTypes.shape({})
};

Content.defaultProps = {
	selection: {}
};

export default Content;
