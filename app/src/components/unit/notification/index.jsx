import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Notification_P from '../../util/pull/notification';
import Logout_P from '../../util/pull/logout';
import Alert from '../../util/alert';

import Message from './message';

import './index.css';

const Notification = () => {
	const notification = useSelector(state => state.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			axios.put('/notifications')
			.then((res) => {
				if(res.data === -1) {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
					Logout_P(dispatch);
				} else {
					Notification_P(dispatch);
				}
			});
		}
	}, [dispatch]);

	return (
		<div className='frame-narrow'>
			<div className='frame-header'>
				<div className='frame-title'>Notification</div>
			</div>
			<div className='frame-body'>
				<div className='notification'>
					{notification.list.length === 0 ? 'There is no notification message' : ''}
					{notification.list.map((message, index) => <Message key={index} message={message} />)}
				</div>
			</div>
		</div>
	);
}

export default Notification;
