import { user_suggest1, user_suggest2 } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Suggest = (dispatch, type) => {
    if(type === 0) {
        if(document.myself.tag.value !== '') {
			const data = {
				type: 'search',
				keyword: document.myself.tag.value,
			}

			axios.get('/tags', { params : data })
			.then((res) => {
				if(res.data === -1) {
					Logout_P();
				} else {
					dispatch(user_suggest1(res.data));
				}
			});
		} else {
			Suggest(dispatch, 2);
		}
    } else if(type === 1) {
        if(document.preference.tag.value !== '') {
			const data = {
				type: 'search',
				keyword: document.preference.tag.value,
			}

			axios.get('/tags', { params : data })
			.then((res) => {
				if(res.data === -1) {
					Logout_P();
				} else {
					dispatch(user_suggest2(res.data));
				}
			});
		} else {
			Suggest(dispatch, 3);
		}
    } else if(type === 2) {
        dispatch(user_suggest1([]));
    } else if(type === 3) {
        dispatch(user_suggest2([]));
    }
}

export default Suggest;