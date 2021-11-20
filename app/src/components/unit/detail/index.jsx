import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { socket } from '../../template/core';

import Chat_P from '../../util/pull/chat';
import Overview_P from '../../util/pull/overview';
import Detail_P from '../../util/pull/detail';
import Match_p from '../../util/pull/match';
import Logout_P from '../../util/pull/logout';
import Alert from '../../util/alert';

import { IMAGE_URL } from '../../../api';

import { FaRegTimesCircle, FaUserAlt, FaLocationArrow, FaHeart } from 'react-icons/fa';
import './index.css';

const Detail = () => {
	const user = useSelector(state => state.user);
	const detail = useSelector(state => state.detail);
	const dispatch = useDispatch();

	useEffect(() => {
		socket.emit('visits', user.data.id, detail.data.id, (result) => {
			if(result === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}, [user.data.id, detail.data.id, dispatch]);

	const _handleFollow = (type) => {
		if(type) {
			socket.emit('likes', user.data.id, detail.data.id, (result) => {
				if(result === -1) {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
					Logout_P(dispatch);
				} else {
					Chat_P(dispatch);
					Overview_P(dispatch, 1);
					Detail_P(dispatch, detail.data.id, user.data.latitude, user.data.longitude);
					Match_p(dispatch);
				}
			});
		} else {
			const data = {
				id: detail.data.isLike
			}

			axios.delete('/likes', { params : data })
			.then((res) => {
				if(res.data === -1) {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
					Logout_P(dispatch);
				} else {
					Chat_P(dispatch);
					Overview_P(dispatch, 1);
					Detail_P(dispatch, detail.data.id, user.data.latitude, user.data.longitude);
					Match_p(dispatch);
				}
			});
		}
	}

	const _handleBlock = () => {
		const data = {
			to: detail.data.id
		}
		axios.post('/blocks', data)
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				Chat_P(dispatch);
				Detail_P(dispatch, detail.data.id, user.data.latitude, user.data.longitude);
			}
		});
	}

	const _handleReport = () => {
		const data = {
			to: detail.data.id
		}
		axios.post('/reports', data)
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}

	const _handleExit = () => {
		Detail_P(dispatch, -1, user.data.latitude, user.data.longitude);
	}

	return (
		<div className='detail'>
			<div className='frame'>
				<div className='frame-header'>
					<div className='frame-title'>
						<div className='detail-title'>
							{detail.data.first_name} {detail.data.last_name}'s Profile
						</div>
						{detail.data.isLike === null 
							?
							<div className='detail-islike' onClick={ () => _handleFollow(1) }>Follow Now</div>
							:
							<div className='detail-islike-active' onClick={ () => _handleFollow(0) }>Followed</div>
						}
					</div>
					<FaRegTimesCircle className='frame-exit' onClick={ () => _handleExit() }/>
				</div>
				<div className='frame-body'>
					<div className='detail-picture-container'>
						{
							detail.data.picture1 !== undefined && detail.data.picture1 !== ''
							?
								<div className='detail-image' style={{
									backgroundImage: `url('${IMAGE_URL}${detail.data.picture1}')`
								}}>
								
								</div>
							:
								<div className='detail-image detail-image-none'>
									
								</div>
						}
						{
							detail.data.picture2 !== undefined && detail.data.picture2 !== ''
							?
								<div className='detail-image' style={{
									backgroundImage: `url('${IMAGE_URL}${detail.data.picture2}')`
								}}>
									
								</div>
							:
								<div className='detail-image detail-image-none'>
									
								</div>
						}
						{
							detail.data.picture3 !== undefined && detail.data.picture3 !== ''
							?
								<div className='detail-image' style={{
									backgroundImage: `url('${IMAGE_URL}${detail.data.picture3}')`
								}}>
									
								</div>
							:
								<div className='detail-image detail-image-none'>
									
								</div>
						}
						{
							detail.data.picture4 !== undefined && detail.data.picture4 !== ''
							?
								<div className='detail-image' style={{
									backgroundImage: `url('${IMAGE_URL}${detail.data.picture4}')`
								}}>
									
								</div>
							:
								<div className='detail-image detail-image-none'>
									
								</div>
						}
						{
							detail.data.picture5 !== undefined && detail.data.picture5 !== ''
							?
								<div className='detail-image' style={{
									backgroundImage: `url('${IMAGE_URL}${detail.data.picture5}')`
								}}>
									
								</div>
							:
								<div className='detail-image detail-image-none'>
									
								</div>
						}
					</div>
					<div className='detail-info-container'>
						<FaUserAlt className='detail-info-icon' />
						<div className='detail-info-content'>Born in {detail.data.birth_year}, {detail.data.age} years old.</div>
					</div>
					<div className='detail-info-container'>
						<FaLocationArrow className='detail-info-icon' />
						<div className='detail-info-content'>In {detail.data.address}. {detail.data.distance.toFixed(2)} miles away.</div>
					</div>
					<div className='detail-info-container'>
						<FaHeart className='detail-info-icon' />
						<div className='detail-info-content'>{detail.data.count_likes - detail.data.count_unlikes >= 0 ? `+${detail.data.count_likes - detail.data.count_unlikes}` : detail.data.count_likes - detail.data.count_unlikes}</div>
					</div>
					<div className='detail-tag-title'>I am ...</div>
					<div className='detail-tag-container'>
						{detail.tag1.length !== 0 ? detail.tag1.map((tag, index) => 
							<div className='detail-tag' key={index}>{tag.tag}</div>
						) : 'There is no tag yet!'}
					</div>
					<div className='detail-tag-title'>I am looking for ...</div>
					<div className='detail-tag-container'>
						{detail.tag2.length !== 0 ? detail.tag2.map((tag, index) => 
							<div className='detail-tag' key={index}>{tag.tag}</div>
						) : 'There is no tag yet!'}
					</div>
					<div className='detail-button-container'>
						<div className='detail-button' onClick={ () => _handleBlock() }>Block</div>
						<div className='detail-button' onClick={ () => _handleReport() }>Report</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;