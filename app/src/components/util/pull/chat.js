import { chat_list } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Chat = (dispatch) => {
    const data = {
        type: 'chat'
    }
    axios.get('/likes', { params: data })
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            dispatch(chat_list(res.data));
        }
    });
}

export default Chat;