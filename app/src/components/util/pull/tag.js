import { user_tag1, user_tag2 } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Tag = (dispatch) => {
    const data1 = {
        type: 'myself'
    }

    axios.get('/tags', { params : data1 })
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            dispatch(user_tag1(res.data));
        }
    });

    const data2 = {
        type: 'preference'
    }

    axios.get('/tags', { params : data2 })
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            dispatch(user_tag2(res.data));
        }
    });
}

export default Tag;