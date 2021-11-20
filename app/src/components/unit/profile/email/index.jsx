import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import '../index.css';

const Email = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			email: document.profile_email.email.value
		};

		axios.put('/users/email', data)
		.then(res => {
			if(res.data) {
				Alert(0, 'Email has updated. Sign in Again!', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				Alert(0, 'Email is invalid', 'Okay', null, null);
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Email</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<form name='profile_email' onSubmit={_handleForm}>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Email Address</div>
						<input type='email' className='profile-input' name='email' defaultValue={user.data.email} />
					</label>
					<input type='submit' className='profile-submit' value='UPDATE' />
				</form>
			</div>
		</div>
	);
}

export default Email;