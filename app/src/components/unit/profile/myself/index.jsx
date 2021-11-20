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

const Myself = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	const _handleAddTag = (e) => {
		e.preventDefault();
		if(document.myself.tag.value !== '') {
			if(_handleCheckDuplicate(document.myself.tag.value)) {
				const data = {
					tag: document.myself.tag.value,
					type: 0
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
			Suggest_P(dispatch, 2);
			document.myself.tag.value = '';
		}
	}

	const _handleAddTagFromSuggest = (value) => {
		if(_handleCheckDuplicate(value)) {
			const data = {
				tag: value,
				type: 0
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
		Suggest_P(dispatch, 2);
		document.myself.tag.value = '';
	}

	const _handleCheckDuplicate = (value) => {
		const result = [...user.tag1];

		for(let i = 0; i < result.length; i++) {
			if(value === result[i].tag) {
				return false;
			}
		}

		return true;
	}
	
	const _handleDeleteTag = (index) => {
		const result = [...user.tag1];
		
		const data = {
			tag: result[index].tag,
			type: 0
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
		Suggest_P(dispatch, 0);
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Describe Who I Am</div>
			<div className='profile-description'>Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.</div>
			<div className='profile-section'>
				<div className='profile-tag-box'>
					{user.tag1.length !== 0 ? user.tag1.map((tag, index) => (
						<Tag key={index} tag={tag} index={index} _handleDeleteTag={_handleDeleteTag} />
					)) : 'There is no tag yet! Please add tag!'}
				</div>
				<form name='myself' onSubmit={_handleAddTag} autoComplete='off'>
					<label className='profile-input-label'>
						<input type='text' className='profile-input' name='tag' placeholder='Tag' onChange={() => _handleSuggest()} />
					</label>
					<div className='profile-suggest-box'>
						{user.suggest1.map((suggest, index) => (
							<Suggest key={index} suggest={suggest} index={index} _handleAddTagFromSuggest={_handleAddTagFromSuggest} />
						))}
					</div>
					<input type='submit' className='profile-submit' value='ADD'/>
				</form>
				
			</div>
		</div>
	);
}

export default Myself;