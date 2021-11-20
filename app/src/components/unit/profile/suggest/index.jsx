import React from 'react';

import '../index.css';

const Suggest = ({suggest, _handleAddTagFromSuggest}) => {
	return (
		<div className='profile-suggest' onClick={() => _handleAddTagFromSuggest(suggest.tag)}>
			{suggest.tag}
		</div>
	);
}

export default Suggest;