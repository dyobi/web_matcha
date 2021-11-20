import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_landing } from '../../../../actions';

import axios from 'axios';

import Alert from '../../../util/alert';

const Fg = () => {
	const dispatch = useDispatch();
	
	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			email: document.forgot.email.value
		};

		axios.get('/mail/password', { params: data })
		.then(res => {
			if(res.data) {
				Alert(0, 'Check your email', 'Okay', null, null);
				dispatch(ui_landing(1));
			} else {
				Alert(0, 'Email is invalid', 'Okay', null, null);
			}
		});
	}

	return (
		<form name='forgot' onSubmit={_handleForm}>
			<div className='landing-in-title'>Have you forgotten your password?</div>
			<div className='landing-in-description'>What was the person thinking when they discovered cow’s milk was fine for human consumption… and why did they do it in the first place!?</div>
			<label className='landing-in-label'>
				<span>Email</span>
				<input className='landing-in-input' type='email' name='email' required/>
			</label>
			<input className='landing-in-submit' type='submit' value='SUBMIT' />
			<input className='landing-in-button' type='button' value='BACK' onClick={ () => dispatch(ui_landing(1)) } />
		</form>
	);
}

export default Fg;