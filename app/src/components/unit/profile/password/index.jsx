import React from 'react';

import { useDispatch } from 'react-redux';
import { user_data } from '../../../../actions';

import axios from 'axios';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import '../index.css';

const Password = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			password: document.profile_password.password.value
		};

		if(_handlePasswordCheck() === 0) {
			axios.put('/users/password', data)
			.then(res => {
				if(res.data) {
					dispatch(user_data({}));
					Alert(0, 'Password has updated. Sign in Again!', 'Okay', null, null);
				} else {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
				}
			});
		} else {
			Alert(0, 'Password is not valid', 'Okay', null, null);
		}
	}

	const _handlePasswordCheck = () => {
		const password = document.profile_password.password.value;
		const confirm = document.profile_password.confirm.value;

		const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
		const pattern3 = /[~!@#$%<>^&*]/;

		let error = 0;
		
		if(!(8 <= password.length && password.length <= 20)) {
			error++;
		}

		if(!pattern1.test(password) || !pattern2.test(password) || !pattern3.test(password)) {
			error++;
		}

		if(password === '' || password !== confirm) {
			error++;
		}

		return error;
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Change Password</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<form name='profile_password' onSubmit={_handleForm}>
					<label className='profile-input-label'>
						<div className='profile-input-title'>New Password</div>
						<input type='password' className='profile-input' name='password' />
					</label>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Confirm Password</div>
						<input type='password' className='profile-input' name='confirm' />
					</label>
					<div className='profile-submit-container'>
						<input type='submit' className='profile-submit' value='UPDATE' />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Password;