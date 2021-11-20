import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../index.css';

const Log = () => {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		axios.get('/logs')
		.then((res) => {
			setLogs(res.data);
		})
	}, []);

	return (
		<div className='profile-container'>
			<div className='profile-title'>Access Logs</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				{logs.map((log, index) => 
					<div className='profile-log-container' key={index}>{log.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{log.info}</div>
				)}
			</div>
		</div>
	);
}

export default Log;