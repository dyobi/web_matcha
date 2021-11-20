import { detail_data, detail_tag1, detail_tag2 } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Detail = (dispatch, id, latitude, longitude) => {
    if(id !== -1) {
        const data = {
            type: 'detail',
            userId: id,
            latitude: latitude,
            longitude: longitude,
        }
        
        axios.get('/users', { params : data })
        .then((res) => {
            if(res.data === -1) {
                Logout_P();
            } else {
                dispatch(detail_data(res.data[0]));
            }
        });

        axios.get('/tags', { params : { type: 'other', userId: id} })
        .then((res) => {
            if(res.data === -1) {
                Logout_P();
            } else {
                dispatch(detail_tag1(res.data.user));
                dispatch(detail_tag2(res.data.other));
            }
        });
    } else {
        dispatch(detail_data({}));
    }
}

export default Detail;