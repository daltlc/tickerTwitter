import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { getSymbolCount } from '../../helper/helpers';

const NoSelection = ({ master }) => {
	const symbolCount = getSymbolCount(master);

	return (
		<div className="no-selection">
			<Typography align="center" color="textSecondary" gutterBottom variant="h4">
				{`Data available for ${symbolCount}`}
			</Typography>
			<Typography align="center" variant="body1" color="textSecondary">
				Please select a ticker above to view tweets
			</Typography>
		</div>
	);
};

NoSelection.propTypes = {
	master: PropTypes.shape({}).isRequired
};

export default NoSelection;
