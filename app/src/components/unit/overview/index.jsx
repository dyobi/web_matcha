import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Nav from './nav';
import Graph from './graph';
import Follow from './follow';

import './index.css';

const Overview = () => {
	const [nav, setNav] = useState(0);
	const overview = useSelector(state => state.overview);

	const _handleNav = (index) => {
		setNav(index);
	}

	return (
		<div className='frame'>
			<div className='frame-header'>
				<div className='frame-title'>OVERVIEW</div>
			</div>
			<Nav nav={nav} setNav={_handleNav} followers={overview.followers} following={overview.following} blocks={overview.blocks} />
			<div className='frame-body-hasNav'>
				{ nav === 0 ? <Graph /> : '' }
				{ nav === 1 ? <Follow follows={overview.followers}/> : '' }
				{ nav === 2 ? <Follow follows={overview.following} /> : '' }
				{ nav === 3 ? <Follow follows={overview.blocks} /> : '' }
			</div>
		</div>
	);
}

export default Overview;
