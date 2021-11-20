import React from 'react';

import '../index.css';

const Nav = ({ nav, setNav }) => {
    return (
        <div className='frame-nav'>
            <div className={nav === 0 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(0) }>
                Account
            </div>
            <div className={nav === 1 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(1) }>
                Profile
            </div>
            <div className={nav === 2 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(2) }>
                Tags
            </div>
            <div className={nav === 3 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(3) }>
                Setting
            </div>
		</div>
	);
}

export default Nav;
