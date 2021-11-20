import React from 'react';

import '../index.css';

const Nav = ({ followers, following, blocks, nav, setNav }) => {
    return (
        <div className='frame-nav'>
            <div className={nav === 0 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(0) }>
                Statistics
            </div>
            <div className={nav === 1 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(1) }>
                Followers ({followers.length})
            </div>
            <div className={nav === 2 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(2) }>
                Following ({following.length})
            </div>
            <div className={nav === 3 ? 'frame-nav-menu-active' : 'frame-nav-menu'} onClick={ () => setNav(3) }>
                Blocks ({blocks.length})
            </div>
		</div>
	);
}

export default Nav;
