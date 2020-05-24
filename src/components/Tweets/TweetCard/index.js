import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

/* Material-UI Components */
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

function TweetCard({ tweet }) {
	const { user, entities, body } = tweet;

	return (
		<Paper>
			<div>
				<div>
					<Avatar alt="user-avatar" src={user.avatar_url_ssl} />
				</div>
				<div>
					<Typography>
						{'\u0040'}
						{user.username}
					</Typography>
				</div>
			</div>
			<Divider />
			<Typography>{body}</Typography>
		</Paper>
	);
}

TweetCard.propTypes = {
	tweet: PropTypes.shape({
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
			avatar_url_ssl: PropTypes.string
		}),

		body: PropTypes.string.isRequired
	}).isRequired
};

export default TweetCard;
