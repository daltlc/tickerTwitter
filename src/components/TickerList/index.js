import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI Components */
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

function TickerList({ activeSymbol, master, setActiveSymbol, removeSymbol }) {
	return (
		<List>
			{Object.entries(master).map(([ id, val ]) => (
				<div className="ticker-container" key={id}>
					<ListItem
						className="ticker-titles"
						alignItems="flex-start"
						button
						selected={id === activeSymbol}
						onClick={() => setActiveSymbol(id)}
					>
						<ListItemText primary={val.symbol.symbol} secondary={val.symbol.title} />
						<ListItemSecondaryAction>
							<Tooltip title="Remove this ticker" placement="right">
								<span>
									<IconButton edge="end" onClick={() => removeSymbol(id)}>
										<RemoveIcon fontSize="small" htmlColor="white" />
									</IconButton>
								</span>
							</Tooltip>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider />
				</div>
			))}
		</List>
	);
}

TickerList.propTypes = {
	activeSymbol: PropTypes.string.isRequired,
	master: PropTypes.shape({}).isRequired,
	removeSymbol: PropTypes.func.isRequired,
	setActiveSymbol: PropTypes.func.isRequired
};

export default TickerList;
