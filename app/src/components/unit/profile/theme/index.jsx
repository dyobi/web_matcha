import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_color } from '../../../../actions';

import cookie from 'react-cookies';

import '../index.css';

const Theme = () => {
	const dispatch = useDispatch();

	const colors = [
		'#c0392b',
		'#e74c3c',
		'#d35400',
		'#e67e22',
		'#f39c12',
		'#f1c40f',
		'#16a085',
		'#1abc9c',
		'#27ae60',
		'#2ecc71',
		'#2980b9',
		'#3498db',
		'#8e44ad',
		'#9b59b6',
		'#7f8c8d',
		'#95a5a6',
		'#2c3e50',
		'#34495e',
	];

	const _handleColor = (color) => {
		cookie.save('theme-color', color, { path: '/' });
		dispatch(ui_color(color));
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Theme</div>
			<div className='profile-description'>I currently have 4 windows open up… and I don’t know why.</div>
			<div className='profile-section'>
				{colors.map((color, index) =>
					<div className='profile-theme-example' key={index} onClick={ () => _handleColor(color) }>
						<div className='profile-theme-exmaple-nav' style={{ backgroundColor: color}}></div>
						<div className='profile-theme-exmaple-body' style={{ backgroundColor: '#ecf0f1'}}>
							<div className='profile-theme-exmaple-container'>
								<div className='profile-theme-example-container-header' style={{ backgroundColor: color}}></div>
							</div>
						</div>
						<div className='profile-theme-exmaple-sidebar' style={{ backgroundColor: color}}></div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Theme;