import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_landing } from '../../../../actions';

import axios from 'axios';

import Alert from '../../../util/alert';

import '../index.css';

const Up = () => {
	const dispatch = useDispatch();
	
	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			email: document.signup.email.value,
			password: document.signup.password.value
		};

		if(_handlePasswordCheck() === 0) {
			axios.post('/auth/up', data)
			.then(res => {
				if(res.data) {
					console.log('signup success');
					dispatch(ui_landing(0));
				} else {
					Alert(0, 'email is duplicated', 'Okay', null, null);
				}
			});
		} else {
			Alert(0, 'Password is not valid', 'Okay', null, null);
		}
	}

	const _handlePasswordCheck = () => {
		const password = document.signup.password.value;
		const confirm = document.signup.confirm.value;

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
		<form name='signup' onSubmit={_handleForm}>
			<div className='landing-in-title'>Sign up right now!</div>
			<div className='landing-in-description'>What was the person thinking when they discovered cow’s milk was fine for human consumption… and why did they do it in the first place!?</div>
			<label className='landing-in-label'>
				<span>Email</span>
				<input className='landing-in-input' type='email' name='email' required />
			</label>
			<label className='landing-in-label'>
				<span>Password</span>
				<input className='landing-in-input' type='password' name='password' required />
			</label>
			<label className='landing-in-label'>
				<span>Confirm</span>
				<input className='landing-in-input' type='password' name='confirm' required />
			</label>
			<input className='landing-in-submit' type='submit' value='SUBMIT' />
			<input className='landing-in-button' type='button' value='BACK' onClick={ () => dispatch(ui_landing(1)) } />
		</form>
	);
}

export default Up;