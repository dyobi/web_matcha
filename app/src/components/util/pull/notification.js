import { notification_list, notification_count } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Notification = (dispatch) => {
    axios.get('/notifications')
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            dispatch(notification_list(res.data));
            if(res.data.find((notification) => notification.checked === 0) !== undefined ? 1 : 0)
                dispatch(notification_count(1));
            else
                dispatch(notification_count(0));
        }
    });
}

export default Notification;