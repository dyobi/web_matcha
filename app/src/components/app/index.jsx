import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_color } from '../../actions';

import User_P from '../util/pull/user';

import cookie from 'react-cookies';

import Core from '../template/core';
import Landing from '../template/landing';

import Wrapper from 'react-div-100vh';


import './index.css';

const App = () => {
	const user = useSelector(state => state.user);
	const ui = useSelector(state => state.ui);
	const dispatch = useDispatch();

	useEffect(() => {
		User_P(dispatch);
	}, [dispatch, user.data.id]);

	const getColor = cookie.load('theme-color');

	if(getColor !== undefined && getColor !== ui.color) {
		dispatch(ui_color(getColor));
	}

	return (
		<Wrapper className='app no-drag'>
			<style>{`
				:root {
					--color-100: ${ui.color + 'ff'};
					--color-90: ${ui.color + 'e6'};
					--color-80: ${ui.color + 'cc'};
					--color-70: ${ui.color + 'b3'};
					--color-60: ${ui.color + '99'};
					--color-50: ${ui.color + '80'};
					--color-40: ${ui.color + '66'};
					--color-30: ${ui.color + '4d'};
					--color-20: ${ui.color + '33'};
					--color-10: ${ui.color + '1a'};
				}
			`}</style>
			{ 
				user.data.id !== undefined ? <Core /> : <Landing /> 
			}
		</Wrapper>
	);
}

export default App;
