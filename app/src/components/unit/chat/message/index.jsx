import React from 'react';

import ReactEmoji from 'react-emoji';

import '../index.css';

const Message = ({ message: { direction, messages, time } }) => {
	return (
        <div className='chat-message'>
            <div className={direction === 0 ? 'chat-message-content chat-message-content-left' : 'chat-message-content chat-message-content-right'}>
                {ReactEmoji.emojify(messages)}
            </div>
            <div className={direction === 0 ? 'chat-message-time chat-message-time-left' : 'chat-message-time chat-message-time-right'}>{time}</div>
        </div>
	);
}

export default Message;