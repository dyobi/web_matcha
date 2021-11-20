import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, detail_data, chat_current } from '../../../../actions';

import { FaStar, FaHeartbeat, FaFire, FaMapMarkerAlt } from "react-icons/fa";
import '../index.css';

const Menu = ({index}) => {
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const _handleNav = () => {
        dispatch(chat_current(-1));
        dispatch(detail_data({}));
        dispatch(ui_nav(index));
    }

	return (
        <div className={ui.nav === index ? 'nav-menu nav-menu-active' : 'nav-menu'} onClick={ () => _handleNav() } >
            { index === 0 ? <div><FaStar className='nav-menu-icon' /><div className='nav-menu-title'>Profile</div></div> : '' }
            { index === 1 ? <div><FaHeartbeat className='nav-menu-icon' /><div className='nav-menu-title'>Overview</div></div> : '' }
            { index === 2 ? <div><FaFire className='nav-menu-icon' /><div className='nav-menu-title'>Match</div></div> : '' }
            { index === 3 ? <div><FaMapMarkerAlt className='nav-menu-icon' /><div className='nav-menu-title'>Search</div></div> : '' }
		</div>
	);
}

export default Menu;