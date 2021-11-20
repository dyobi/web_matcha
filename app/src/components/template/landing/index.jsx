import React from 'react';

import { useSelector } from 'react-redux';

import Init from './init';
import In from './in';
import Up from './up';
import Fg from './fg';

import './index.css';

const Landing = () => {
	const ui = useSelector(state => state.ui);

	return (
		<div className='landing'>
			{ ui.landing === 0 ? <Init /> : '' }
			{ ui.landing !== 0 ?
				<div className='landing-container'>	
					{ ui.landing === 1 ? <In /> : '' }
					{ ui.landing === 2 ? <Up /> : '' }
					{ ui.landing === 3 ? <Fg /> : '' }
				</div>
			: '' }
		</div>
	);
}

export default Landing;
