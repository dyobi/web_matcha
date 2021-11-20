import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IMAGE_URL } from '../../../../api';

import '../index.css';
import Detail_P from '../../../util/pull/detail';

const Message = ({message}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const _handleDetail = () => {
        Detail_P(dispatch, message.from, user.data.latitude, user.data.longitude);
    }

	return (
        <div className={!message.checked ? 'notification-message-active' : 'notification-message'} onClick={ () => _handleDetail() }>
            <div className='notification-message-picture' style={{
                backgroundImage: `url('${IMAGE_URL}${message.picture}')`
            }}></div>
            <div className='notification-message-content'>
                {message.type === 'appears' ? `${message.first_name} ${message.last_name} saw your profile card.` : '' }
                {message.type === 'visits' ? `${message.first_name} ${message.last_name} visited your profile.` : '' }
                {message.type === 'likes' ? `${message.first_name} ${message.last_name} liked you.` : '' }
                {message.type === 'unlikes' ? `${message.first_name} ${message.last_name} unliked you.` : '' }
            </div>
            <div className='notification-message-time'>{message.formattedTime}</div>
        </div>
	);
}

export default Message;