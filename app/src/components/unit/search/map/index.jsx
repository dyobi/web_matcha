import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Detail_P from '../../../util/pull/detail';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import { GMAP_KEY } from '../../../../api';

import '../index.css';

const Map = (props) => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [ markers, setMarkers ] = useState([]);
	
	useEffect(() => {
		const data = {
			userId: -1,
			latitude: user.data.latitude,
			longitude: user.data.longitude,
		}

		axios.get('/users', { params: data} )
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				setMarkers(res.data);
			}
		});	
	}, [user, dispatch]);

	const _handleDetail = (id) => {
		console.log(id);
		Detail_P(dispatch, id, user.data.latitude, user.data.longitude);
	}

	const _handleDrag = (mapProps, map) => {
		const data = {
			userId: -1,
			latitude: map.center.lat(),
			longitude: map.center.lng(),
		}

		axios.get('/users', { params: data} )
		.then((res) => {
			if(res.data === -1) {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			} else {
				setMarkers(res.data);
			}
		});	
	}

	return (
		<GoogleMap
			className='search-map'
			google={props.google}
			zoom={12}
			initialCenter={{ lat: user.data.latitude, lng: user.data.longitude }}
			onDragend={_handleDrag}
		>
			{markers.map((marker, index) => 
				<Marker
					key={index}
					position={{lat: marker.latitude, lng: marker.longitude}}
					onClick={() => _handleDetail(marker.id)}/>
			)}
		</GoogleMap>
	);
}

export default GoogleApiWrapper({
	apiKey: GMAP_KEY
  })(Map);
