import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import User_P from '../../../util/pull/user';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import { GMAP_KEY } from '../../../../api';

import '../index.css';

const Location = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	const _handleForm = (e) => {
		e.preventDefault();

		const zipcode = document.profile_location.zipcode.value;

		if(zipcode.length === 5) {
			axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=en&address=' + zipcode + '&key=' + GMAP_KEY)
			.then((res) => {
				if(res.data.status === 'ZERO_RESULTS') {
					Alert(0, 'zipcode is invalid', 'Okay', null, null);
					document.profile_location.zipcode.value = '';
				} else {
					let result = res.data.results[0].formatted_address.split(' ');
					let address = '';
					for(let i = 0; i < result.length; i++) {
						if(i !== result.length - 2)
							address += i + 1 === result.length ? result[i] : (i === result.length - 3 ? result[i] + ', ' : result[i] + ' ');
					}

					const data = {
						address: address,
						latitude: res.data.results[0].geometry.location.lat,
						longitude: res.data.results[0].geometry.location.lng,
					};

					axios.put('/users/address', data)
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
			});
		}
	}

	const _handleCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + GMAP_KEY)
			.then((res) => {
				let result = res.data.plus_code.compound_code.split(' ');
				let address = '';
				for(let i = 1; i < result.length; i++) {
					address += i + 1 === result.length ? result[i] : result[i] + ' ';
				}

				const data = {
					address: address,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};

				axios.put('/users/address', data)
				.then(res => {
					if(res.data) {
						Alert(0, 'User information has been updated!', 'Okay', null, null);
						User_P(dispatch);
					} else {
						Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
						Logout_P(dispatch);
					}
				});
			});
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Location</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<form name='profile_location' onSubmit={_handleForm}>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Current Address</div>
						<div className='profile-input'>{user.data.address === '' ? 'Unknown' : user.data.address}</div>
					</label>
					<label className='profile-input-label'>
						<div className='profile-input-title'>Zipcode</div>
						<input type='number' className='profile-input' name='zipcode' />
					</label>
					<div className='profile-submit-container'>
						<input type='submit' className='profile-submit' value='UPDATE' />
						<input type='button' className='profile-submit' value='SET AS CURRENT LOCATION' onClick={ () => _handleCurrentLocation() } />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Location;