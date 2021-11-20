import { chat_messages } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Messages = (dispatch, id) => {
    const data = {
        to: id
    }
    axios.get('/messages', { params: data })
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            dispatch(chat_messages(res.data));
        }
    });
}

export default Messages;