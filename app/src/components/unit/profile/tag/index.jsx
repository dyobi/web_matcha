import React from 'react';

import '../index.css';

const Tag = ({tag, index, _handleDeleteTag}) => {
	return (
		<div className='profile-tag' onDoubleClick={() => _handleDeleteTag(index)}>
			{tag.tag}
		</div>
	);
}

export default Tag;