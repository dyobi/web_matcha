import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import User_P from '../../../util/pull/user';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import { IMAGE_URL } from '../../../../api';

import { FaPlusCircle, FaRegTimesCircle } from 'react-icons/fa';

import '../index.css';

const Picture = () => {
	const user = useSelector(state => state.user);
	const [index, setIndex] = useState(0);
	const dispatch = useDispatch();

	const _handlePicture = (e, type, index) => {
		e.stopPropagation();
		setIndex(index);
		if(type) {
			document.getElementById('profile_picture').click();
		} else {
			_handlePictureDelete(index);
		}
	}

	const _handlePictureUpload = () => {
		let input = document.getElementById('profile_picture');
		let extension = input.value.split('.')[input.value.split('.').length - 1];
		if(extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
			let file = input.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const data = {
					picture : reader.result,
					index: index
				}

				axios.put('/users/picture', data)
				.then((res) => {
					if(res.data === -1) {
						Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
						Logout_P(dispatch);
					} else {
						User_P(dispatch);
					}
				});
				
				input.value = '';
			}
		} else {
			input.value = '';
		}
	}

	const _handlePictureDelete = (index) => {
		const data = {
			picture : '',
			index: index
		}

		axios.put('/users/picture', data)
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				User_P(dispatch);
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Picture</div>
			<div className='profile-description'>I currently have 4 windows open up… and I don’t know why.</div>
			<div className='profile-section'>
				{
					user.data.picture1 !== '' && user.data.picture1 !== undefined
					?
						<div className='profile-image' onClick={ (e) => _handlePicture(e, 1, 1) } style={{
							backgroundImage: `url('${IMAGE_URL}${user.data.picture1}')`
						}}>
						
						</div>
					:
						<div className='profile-image profile-image-none' onClick={ (e) => _handlePicture(e, 1, 1) }>
							<FaPlusCircle className='profile-image-none-icon' />
						</div>
				}
				{
					user.data.picture2 !== '' && user.data.picture2 !== undefined
					?
						<div className='profile-image' onClick={ (e) => _handlePicture(e, 1, 2) } style={{
							backgroundImage: `url('${IMAGE_URL}${user.data.picture2}')`
						}}>
							<FaRegTimesCircle className='profile-image-delete' onClick={ (e) => _handlePicture(e, 0, 2) }/>
						</div>
					:
						<div className='profile-image profile-image-none' onClick={ (e) => _handlePicture(e, 1, 2) }>
							<FaPlusCircle className='profile-image-none-icon' />
						</div>
				}
				{
					user.data.picture3 !== '' && user.data.picture3 !== undefined
					?
						<div className='profile-image' onClick={ (e) => _handlePicture(e, 1, 3) } style={{
							backgroundImage: `url('${IMAGE_URL}${user.data.picture3}')`
						}}>
							<FaRegTimesCircle className='profile-image-delete' onClick={ (e) => _handlePicture(e, 0, 3) }/>
						</div>
					:
						<div className='profile-image profile-image-none' onClick={ (e) => _handlePicture(e, 1, 3) }>
							<FaPlusCircle className='profile-image-none-icon' />
						</div>
				}
				{
					user.data.picture4 !== '' && user.data.picture4 !== undefined
					?
						<div className='profile-image' onClick={ (e) => _handlePicture(e, 1, 4) } style={{
							backgroundImage: `url('${IMAGE_URL}${user.data.picture4}')`
						}}>
							<FaRegTimesCircle className='profile-image-delete' onClick={ (e) => _handlePicture(e, 0, 4) }/>
						</div>
					:
						<div className='profile-image profile-image-none' onClick={ (e) => _handlePicture(e, 1, 4) }>
							<FaPlusCircle className='profile-image-none-icon' />
						</div>
				}
				{
					user.data.picture5 !== '' && user.data.picture5 !== undefined
					?
						<div className='profile-image' onClick={ (e) => _handlePicture(e, 1, 5) } style={{
							backgroundImage: `url('${IMAGE_URL}${user.data.picture5}')`
						}}>
							<FaRegTimesCircle className='profile-image-delete' onClick={ (e) => _handlePicture(e, 0, 5) }/>
						</div>
					:
						<div className='profile-image profile-image-none' onClick={ (e) => _handlePicture(e, 1, 5) }>
							<FaPlusCircle className='profile-image-none-icon' />
						</div>
				}
				<input id='profile_picture' type='file' onChange={ () => _handlePictureUpload() } style={{ display: 'none' }} />
			</div>
		</div>
	);
}

export default Picture;
