import { overview_graph, overview_followers, overview_following, overview_blocks } from '../../../actions';

import axios from 'axios';

import Logout_P from './logout';

const Overview = (dispatch, type) => {

	const _handleDate = (diff) => {
		let date = new Date();

		date.setTime(date.getTime() - diff * 24 * 60 * 60 * 1000);
		const month = date.getMonth() + 1; 
		const day = date.getDate();

		return month + '/' + day;
	}

    if(type === 0) {
        axios.get('/overviews')
		.then((res) => {
			if(res.data === -1) {
				Logout_P();
			} else {
				if(res.data) {
					const graph = [
						{
							id: res.data[0].type,
							data: [
								{
									'x': _handleDate(6),
									'y': res.data[0].date1
								},
								{
									'x': _handleDate(5),
									'y': res.data[0].date2
								},
								{
									'x': _handleDate(4),
									'y': res.data[0].date3
								},
								{
									'x': _handleDate(3),
									'y': res.data[0].date4
								},
								{
									'x': _handleDate(2),
									'y': res.data[0].date5
								},
								{
									'x': _handleDate(1),
									'y': res.data[0].date6
								},
								{
									'x': _handleDate(0),
									'y': res.data[0].date7
								}
							]
						},
						{
							id: res.data[1].type,
							data: [
								{
									'x': _handleDate(6),
									'y': res.data[1].date1
								},
								{
									'x': _handleDate(5),
									'y': res.data[1].date2
								},
								{
									'x': _handleDate(4),
									'y': res.data[1].date3
								},
								{
									'x': _handleDate(3),
									'y': res.data[1].date4
								},
								{
									'x': _handleDate(2),
									'y': res.data[1].date5
								},
								{
									'x': _handleDate(1),
									'y': res.data[1].date6
								},
								{
									'x': _handleDate(0),
									'y': res.data[1].date7
								}
							]
						},
						{
							id: res.data[2].type,
							data: [
								{
									'x': _handleDate(6),
									'y': res.data[2].date1
								},
								{
									'x': _handleDate(5),
									'y': res.data[2].date2
								},
								{
									'x': _handleDate(4),
									'y': res.data[2].date3
								},
								{
									'x': _handleDate(3),
									'y': res.data[2].date4
								},
								{
									'x': _handleDate(2),
									'y': res.data[2].date5
								},
								{
									'x': _handleDate(1),
									'y': res.data[2].date6
								},
								{
									'x': _handleDate(0),
									'y': res.data[2].date7
								}
							]
						},
						{
							id: res.data[3].type,
							data: [
								{
									'x': _handleDate(6),
									'y': res.data[3].date1
								},
								{
									'x': _handleDate(5),
									'y': res.data[3].date2
								},
								{
									'x': _handleDate(4),
									'y': res.data[3].date3
								},
								{
									'x': _handleDate(3),
									'y': res.data[3].date4
								},
								{
									'x': _handleDate(2),
									'y': res.data[3].date5
								},
								{
									'x': _handleDate(1),
									'y': res.data[3].date6
								},
								{
									'x': _handleDate(0),
									'y': res.data[3].date7
								}
							]
						},
					];
					dispatch(overview_graph(graph));
				}
			}
		});
    } else if(type === 1) {
        const data = {
			type: 'follow'
		}

		axios.get('/likes', { params : data })
		.then((res) => {
			if(res.data === -1) {
				Logout_P();
			} else {
				dispatch(overview_followers(res.data.user));
				dispatch(overview_following(res.data.other));
			}
		});
    } else if(type === 2) {
        axios.get('/blocks')
		.then((res) => {
			if(res.data === -1) {
				Logout_P();
			} else {
				dispatch(overview_blocks(res.data));
			}
		});
    }
}

export default Overview;