import React from 'react';

import Map from './map';

import './index.css';

const Search = () => {
	return (
		<div className='frame'>
			<div className='frame-header'>
				<div className='frame-title'>SEARCH</div>
			</div>
			<div className='frame-body'>
				<Map />
			</div>
		</div>
	);
}

export default Search;
