import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, detail_data, chat_current, notification_count } from '../../../actions';

import io from 'socket.io-client';
import { SOCKET_URL } from '../../../api';

import Tag_P from '../../util/pull/tag';
import Chat_P from '../../util/pull/chat';
import Messages_P from '../../util/pull/messages';
import Overview_P from '../../util/pull/overview';
import Notification_P from '../../util/pull/notification';

import Nav from '../../unit/nav';
import Profile from '../../unit/profile';
import Overview from '../../unit/overview';
import Match from '../../unit/match';
import Search from '../../unit/search';
import Chatlist from '../../unit/chatlist';
import Chat from '../../unit/chat';
import Detail from '../../unit/detail';
import Notification from '../../unit/notification';

import { FaBell, FaComment } from 'react-icons/fa';

import NotificationMP3 from '../../../resources/notification.mp3';

import './index.css';

import './mobile.css';

export let socket;

const Core = () => {
	const ui = useSelector(state => state.ui);
	const user = useSelector(state => state.user);
	const detail = useSelector(state => state.detail);
	const chat = useSelector(state => state.chat);
	const notification = useSelector(state => state.notification);

	const dispatch = useDispatch();

	useEffect(() => {
		Tag_P(dispatch);
		Chat_P(dispatch);
		Overview_P(dispatch, 0);
		Overview_P(dispatch, 1);
		Overview_P(dispatch, 2);
		Notification_P(dispatch);
	}, [dispatch, user.data.id]);

	useEffect(() => {
		socket = io(SOCKET_URL);

		socket.emit('join', user.data.id, () => {
			
		});

		socket.on('notification', () => {
			document.getElementById('notification-mp3').play();
			Notification_P(dispatch);
		});

		socket.on('message', () => {
			document.getElementById('message-mp3').play();
			Chat_P(dispatch);
			if(chat.current !== -1)
				Messages_P(dispatch, chat.list[chat.current].id);
		});
	});

	const _handleNav = (index) => {
		dispatch(chat_current(-1));
		dispatch(detail_data({}));
		if(index === 5) {
			dispatch(notification_count(0));
		}
		dispatch(ui_nav(index));
	}

	return (
			<div className='core'>
				<Nav />
				<div className='default'>
					{ui.nav === 0 ? <Profile /> : null}
					{!user.isComplete ? <div className='announcement'>After you have completed your profile, you will be able to access a matching service.</div> : null}
					{user.isComplete && ui.nav === 1 ? <Overview /> : null}
					{user.isComplete && ui.nav === 2 ? <Match /> : null}
					{user.isComplete && ui.nav === 3 ? <Search /> : null}
					{user.isComplete && ui.nav === 4 ? <Chatlist /> : null}
					{user.isComplete && ui.nav === 5 ? <Notification /> : null}
					{chat.current !== -1 ? <Chat /> : null}
					{detail.data.id !== undefined ? <Detail /> : null}
					{user.isComplete ? <FaBell className={ui.nav === 5 ? 'core-nav-notification-active' : 'core-nav-notification'} onClick={ () => _handleNav(5)} /> : null}
					{user.isComplete ? <FaComment className={ui.nav === 4 ? 'core-nav-chat-active' : 'core-nav-chat'} onClick={ () => _handleNav(4)} /> : null}
					{user.isComplete ? <div id='notification-top' className={ui.nav === 5 ? 'core-nav-decoration-top-active' : 'core-nav-decoration-top'} onClick={ () => _handleNav(5)} ></div> : null}
					{user.isComplete ? <div id='notification-bottom' className={ui.nav === 4 ? 'core-nav-decoration-bottom-active' : 'core-nav-decoration-bottom'} onClick={ () => _handleNav(4)} ></div> : null}
					{notification.count !== 0 ? <div className='core-nav-icon-top' onClick={ () => _handleNav(5)} >N</div> : null}
					{chat.list.findIndex((chat) => chat.count !== 0) !== -1 ? <div className='core-nav-icon-bottom' onClick={ () => _handleNav(4)} >N</div> : null}
				</div>
				<audio id='notification-mp3' style={{ display: 'none' }} autoPlay=''>
					<source src={NotificationMP3} type='audio/mp3' />
				</audio>
				<audio id='message-mp3' style={{ display: 'none' }} autoPlay=''>
					<source src={NotificationMP3} type='audio/mp3' />
				</audio>
			</div>
	);
}

export default Core;
