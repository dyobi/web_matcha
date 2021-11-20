import { match_data } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Match = (dispatch) => {
    dispatch(match_data({id: -1}));
    axios.get('/matches')
    .then((res) => {
        if(res.data === -1) {
            Logout_P();
        } else {
            setTimeout(() => {
                if(res.data.length !== 0) {
                    dispatch(match_data(res.data[0]));
                } else {
                    dispatch(match_data({}));
                }
            }, 1000);
        }
    });
}

export default Match;