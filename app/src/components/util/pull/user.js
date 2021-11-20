import { user_data, user_isComplete } from '../../../actions';

import axios from 'axios';

const User = (dispatch) => {
    const data = {
        userId: -1,
    }
    
    axios.get('/users', { params : data })
    .then((res) => {
        if(res.data.length !== 0 && res.data !== -1) {
            dispatch(user_data(res.data[0]));
            if(res.data[0].picture1 !== '' && res.data[0].first_name !== '' && res.data[0].last_name !== '' && res.data[0].address !== '') {
                dispatch(user_isComplete(true));
            } else {
                dispatch(user_isComplete(false));
            }
        }
    });
}

export default User;