import { user_data, chat_current, detail_data, match_data, chat_list, chat_messages, user_tag1, user_tag2, user_suggest1, user_suggest2 } from '../../../actions';

import axios from 'axios';

const Logout = (dispatch) => {
    axios.get('/auth/out')
    .then((res) => {
        if(res.data) {
            dispatch(user_data({}));
            dispatch(chat_current(-1));
            dispatch(detail_data({}));
            dispatch(match_data({}));
            dispatch(chat_list([]));
            dispatch(chat_messages([]));
            dispatch(user_tag1([]));
            dispatch(user_tag2([]));
            dispatch(user_suggest1([]));
            dispatch(user_suggest2([]));
        }
    });
}

export default Logout;