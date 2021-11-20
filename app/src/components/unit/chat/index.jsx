import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { chat_current, chat_messages } from '../../../actions';

import axios from 'axios';
import { socket } from '../../template/core';

import Detail_p from '../../util/pull/detail';
import Messages_P from '../../util/pull/messages';
import Logout_P from '../../util/pull/logout';
import Alert from '../../util/alert';

import Message from './message';

import ScrollToBottom from 'react-scroll-to-bottom';

import { FaTimesCircle } from "react-icons/fa";
import './index.css';

const Chat = () => {
	const [message, setMessage] = useState('');
	const user = useSelector(state => state.user);
	const chat = useSelector(state => state.chat);
	const dispatch = useDispatch();

	useEffect(() => {
		axios.put('/messages', { from: chat.list[chat.current].id, to : user.data.id })
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}, [chat, user.data.id, dispatch]);

	const _handleForm = (e) => {
		e.preventDefault();

		if(message !== '') {
			socket.emit('message', user.data.id, chat.list[chat.current].id, message, (result) => {
				if(result === -1) {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
					Logout_P(dispatch);
				} else {
					Messages_P(dispatch, chat.list[chat.current].id);
				}
			});
			setMessage('');
		}
	}

	const _handleDetail = () => {
		Detail_p(dispatch, chat.list[chat.current].id, user.data.latitude, user.data.longitude);
	}

	const _handleExit = () => {
		dispatch(chat_current(-1));
		dispatch(chat_messages([]));
	}

	return (
		<div className='frame-narrow'>
			<div className='chat-header'>
				<div className='chat-header-name' onClick={ () => _handleDetail() }>{chat.current !== -1 ? `${chat.list[chat.current].first_name} ${chat.list[chat.current].last_name}` : ''}</div>
				<FaTimesCircle className='chat-header-exit' onClick={ () => _handleExit() } />
			</div>
			<ScrollToBottom className='chat-body'>
				{chat.messages.map((message, index) => 
					<Message message={message} key={index} />	
				)}
			</ScrollToBottom>
			<div className='chat-footer'>
				<form onSubmit={_handleForm}>
					<input className='chat-footer-input' type='text' value={message} onChange={(event) => setMessage(event.target.value)} />
					<input className='chat-footer-submit' type='submit' value='SEND' />
				</form>
			</div>
		</div>
	);
}

export default Chat;
