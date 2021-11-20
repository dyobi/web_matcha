import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IMAGE_URL } from '../../../../api';

import '../index.css';
import Detail_P from '../../../util/pull/detail';

const Follow = ({ follows }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const _handleDetail = (id) => {
        Detail_P(dispatch, id, user.data.latitude, user.data.longitude);
    }

    return (
        <div className='overview-follow'>
            {follows.length === 0 ? 'There is no result' : ''}
            {follows.map((follow, index) => 
                <div className='overview-follow-card' key={index} style={{
                    backgroundImage: `url('${IMAGE_URL}${follow.picture1}')`
                }} onClick={ () => _handleDetail(follow.id) }>
                    <div className='overview-follow-name'>{follow.first_name} {follow.last_name}</div>
                </div>
            )}
		</div>
	);
}

export default Follow;
