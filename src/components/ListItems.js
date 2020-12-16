import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
const ListItems = ({ singleList }) => {
	const options = [];

	for (const [key, value] of Object.entries(singleList)) {
		options.push(
			<ListItem button key={key}>
				<ListItemText
					primary={key}
					secondary={Array.isArray(value) ? value.length : value}
				/>
			</ListItem>
		);
	}
	return (
		<div>
			<React.Fragment>{options}</React.Fragment>
		</div>
	);
};

export default ListItems;
