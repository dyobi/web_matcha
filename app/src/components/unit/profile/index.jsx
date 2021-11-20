import React, { useState } from 'react';

import Nav from './nav';
import Email from './email';
import Password from './password';
import Log from './log';
import Picture from './picture';
import Info from './info';
import Filter from './filter';
import Bio from './bio';
import Location from './location';
import Myself from './myself';
import Preference from './preference';
import Theme from './theme';
import Notification from './notification';
import Close from './close';

import './index.css';

const Profile = () => {
	const [nav, setNav] = useState(0);

	return (
		<div className='frame'>
			<div className='frame-header'>
				<div className='frame-title'>PROFILE</div>
			</div>
			<Nav nav={nav} setNav={setNav} />
			<div className='frame-body-hasNav'>
				{ nav === 0 ? <Email /> : '' }
				{ nav === 0 ? <Password /> : '' }
				{ nav === 0 ? <Log /> : '' }
				{ nav === 1 ? <Picture /> : '' }
				{ nav === 1 ? <Info /> : '' }
				{ nav === 1 ? <Filter /> : '' }
				{ nav === 1 ? <Bio /> : '' }
				{ nav === 1 ? <Location /> : '' }
				{ nav === 2 ? <Myself /> : '' }
				{ nav === 2 ? <Preference /> : '' }
				{ nav === 3 ? <Theme /> : '' }
				{ nav === 3 ? <Notification /> : '' }
				{ nav === 3 ? <Close /> : '' }
			</div>
		</div>
	);
}

export default Profile;
