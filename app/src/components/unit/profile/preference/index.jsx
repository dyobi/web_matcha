import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Tag_P from '../../../util/pull/tag';
import Suggest_P from '../../../util/pull/suggest';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import Tag from '../tag';
import Suggest from '../suggest';

import '../index.css';

const Preference = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	const _handleAddTag = (e) => {
		e.preventDefault();
		if(document.preference.tag.value !== '') {
			if(_handleCheckDuplicate(document.preference.tag.value)) {
				const data = {
					tag: document.preference.tag.value,
					type: 1
				}

				axios.post('/tags', data)
				.then((res) => {
					if(res.data) {
						Tag_P(dispatch);
					} else {
						Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
						Logout_P(dispatch);
					}
				});
			}
			Suggest_P(dispatch, 3);
			document.preference.tag.value = '';
		}
	}

	const _handleAddTagFromSuggest = (value) => {
		if(_handleCheckDuplicate(value)) {
			const data = {
				tag: value,
				type: 1
			}

			axios.post('/tags', data)
			.then((res) => {
				if(res.data) {
					Tag_P(dispatch);
				} else {
					Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
					Logout_P(dispatch);
				}
			});
		}
		Suggest_P(dispatch, 3);
		document.preference.tag.value = '';
	}

	const _handleCheckDuplicate = (value) => {
		const result = [...user.tag2];

		for(let i = 0; i < result.length; i++) {
			if(value === result[i].tag) {
				return false;
			}
		}

		return true;
	}
	
	const _handleDeleteTag = (index) => {
		const result = [...user.tag2];
		
		const data = {
			tag: result[index].tag,
			type: 1
		}

		axios.delete('/tags', { params: data })
		.then((res) => {
			if(res.data) {
				Tag_P(dispatch);
			} else {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}

	const _handleSuggest = () => {
		Suggest_P(dispatch, 1);
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Describe Who I Am Looking For</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<div className='profile-tag-box'>
					{user.tag2.length !== 0 ? user.tag2.map((tag, index) => (
						<Tag key={index} tag={tag} index={index} _handleDeleteTag={_handleDeleteTag} />
					)) : 'There is no tag yet! Please add tag!'}
				</div>
				<form name='preference' onSubmit={_handleAddTag} autoComplete='off'>
					<label className='profile-input-label'>
						<input type='text' className='profile-input' name='tag' placeholder='Tag' onChange={_handleSuggest} />
					</label>
					<div className='profile-suggest-box'>
						{user.suggest2.map((suggest, index) => (
							<Suggest key={index} suggest={suggest} index={index} _handleAddTagFromSuggest={_handleAddTagFromSuggest} />
						))}
					</div>
					<input type='submit' className='profile-submit' value='ADD'/>
				</form>
			</div>
		</div>
	);
}

export default Preference;