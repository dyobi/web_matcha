import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../../../template/core';

import { IMAGE_URL } from '../../../../api';

import Chat_P from '../../../util/pull/chat';
import Overview_P from '../../../util/pull/overview';
import Detail_P from '../../../util/pull/detail';
import Match_P from '../../../util/pull/match';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaTimes, FaSearchPlus, FaHeart } from 'react-icons/fa';

import '../index.css';

const Card = () => {
	const [ index, setIndex ] = useState(0);

	const user = useSelector(state => state.user);
	const match = useSelector(state => state.match);
	const dispatch = useDispatch();

	useEffect(() => {
		_handleImage();
	});

	useEffect(() => {
		socket.emit('appears', user.data.id, match.data.id, (result) => {
			if(result === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}, [user.data.id, match.data.id, dispatch]);
	
	const _handleImage = () => {
		let images = document.getElementsByClassName('match-card-picture');
		for(let i = 0; i < images.length; i++) {
			if(i === index) {
				images[i].style.opacity = 1;
			} else {
				images[i].style.opacity = 0;
			}
		}
	}

	const _handleIndex = (toRight) => {
		let result = 0;
		if(toRight) {
			if(0 <= index && index <= 3)
				result = index + 1;
			else
				result = 0;
		} else {
			if(1 <= index && index <= 4)
				result = index - 1;
			else
				result = 4;
		}
		setIndex(result);
	}

	const _handleLike = () => {
		socket.emit('likes', user.data.id, match.data.id, (result) => {
			if(result === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				Chat_P(dispatch);
				Overview_P(dispatch, 1);
				Match_P(dispatch);
			}
		});
	}

	const _handleDetail = () => {
		Detail_P(dispatch, match.data.id, user.data.latitude, user.data.longitude);
	}

	const _handleUnlike = () => {
		socket.emit('unlikes', user.data.id, match.data.id, (result) => {
			if(result === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				Match_P(dispatch);
			}
		});
	}

	return (
		<div className='match-card'>
			<div className='match-card-pictures'>
				{match.data.picture1 !== '' && match.data.picture1 !== undefined ?
					<div className='match-card-picture' style={{
						backgroundImage: `url('${IMAGE_URL}${match.data.picture1}')`
					}}></div>
				: <div className='match-card-picture'>This slot is empty</div> }
				{match.data.picture2 !== '' && match.data.picture2 !== undefined ?
					<div className='match-card-picture' style={{
						backgroundImage: `url('${IMAGE_URL}${match.data.picture2}')`
					}}></div>
				: <div className='match-card-picture'>This slot is empty</div> }
				{match.data.picture3 !== '' && match.data.picture3 !== undefined ?
					<div className='match-card-picture' style={{
						backgroundImage: `url('${IMAGE_URL}${match.data.picture3}')`
					}}></div>
				: <div className='match-card-picture'>This slot is empty</div> }
				{match.data.picture4 !== '' && match.data.picture4 !== undefined ?
					<div className='match-card-picture' style={{
						backgroundImage: `url('${IMAGE_URL}${match.data.picture4}')`
					}}></div>
				: <div className='match-card-picture'>This slot is empty</div> }
				{match.data.picture5 !== '' && match.data.picture5 !== undefined ?
					<div className='match-card-picture' style={{
						backgroundImage: `url('${IMAGE_URL}${match.data.picture5}')`
					}}></div>
				: <div className='match-card-picture'>This slot is empty</div> }
			</div>
			<div className='match-card-title'>{match.data.first_name} {match.data.last_name} ({match.data.age})</div>
			<FaArrowAltCircleLeft className='match-card-arrow match-card-arrow-left' onClick={ () => _handleIndex(false) } />
			<FaArrowAltCircleRight className='match-card-arrow match-card-arrow-right' onClick={ () => _handleIndex(true) } />
			<FaTimes className='match-card-icon match-card-icon-dislike' onClick={ () => _handleUnlike() } />
			<FaSearchPlus className='match-card-icon match-card-icon-detail' onClick={ () => _handleDetail() }/>
			<FaHeart className='match-card-icon match-card-icon-like' onClick={ () => _handleLike() } />
		</div>
	);
}

export default Card;