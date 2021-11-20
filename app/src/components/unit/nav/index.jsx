import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Logout_P from '../../util/pull/logout';

import Menu from './menu';

import { IMAGE_URL } from '../../../api';

import { FaLocationArrow, FaUnlink } from "react-icons/fa";
import './index.css';

const Nav = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handledLogout = () => {
		Logout_P(dispatch);
	}

	return (
		<div className='nav'>
			<div className='nav-profile' style={user.data.picture1 !== '' && user.data.picture1 !== undefined ? {
				backgroundImage: `url('${IMAGE_URL}${user.data.picture1}')`
			} : null}></div>
			<div className='nav-fullname'>{user.data.first_name === '' && user.data.last_name === '' ? 'Unknown' : '' }{user.data.first_name} {user.data.last_name}</div>
			<div className='nav-location-container'>
				<FaLocationArrow className='nav-location-icon'/>
				<div className='nav-location-address'>{user.data.address === '' ? 'Unknown' : user.data.address}</div>
			</div>
			<Menu index={0} />
			{user.isComplete ? <Menu index={1} /> : ''}
			{user.isComplete ? <Menu index={2} /> : ''}
			{user.isComplete ? <Menu index={3} /> : ''}
			<FaUnlink className='nav-menu-icon' onClick={ () => _handledLogout() }/>
			<div className='nav-menu-title' onClick={ () => _handledLogout() }>Logout</div>
		</div>
	);
}

export default Nav;
