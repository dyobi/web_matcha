import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import User_P from '../../../util/pull/user';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import '../index.css';

const Filter = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			preference_min_age: document.profile_filter.preference_min_age.value,
			preference_max_age: document.profile_filter.preference_max_age.value,
			preference_max_distance: document.profile_filter.preference_max_distance.value,
		};

		axios.put('/users/filters', data)
		.then(res => {
			if(res.data) {
				Alert(0, 'User information has been updated!', 'Okay', null, null);
				User_P(dispatch);
			} else {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Filter</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<form name='profile_filter' onSubmit={_handleForm}>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Minimum Age</div>
						<input type='number' className='profile-input' name='preference_min_age' defaultValue={user.data.preference_min_age} />
					</label>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Maximum Age</div>
						<input type='number' className='profile-input' name='preference_max_age' defaultValue={user.data.preference_max_age} />
					</label>
					<label className='profile-input-label-last'>
						<div className='profile-input-title'>Maximum Distance (Miles)</div>
						<input type='number' min='0' className='profile-input' name='preference_max_distance' defaultValue={user.data.preference_max_distance} placeholder='No Matter' />
					</label>
					<input type='submit' className='profile-submit' value='UPDATE' />
				</form>
			</div>
		</div>
	);
}

export default Filter;