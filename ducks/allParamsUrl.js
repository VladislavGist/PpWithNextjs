import { push } from 'react-router-redux'

import { actions as actionsSnackbarReducer } from './snackbarReducer'
import { actions as actionsAuthReducer } from './auth'

import { tgReachGoal } from '../analytics'
import config from '../config'

const appName = 'paypets'
export const moduleName = 'articles'

export const types = {
	ADD_ARTICLE_REQUEST: `${ appName }/${ moduleName }/ADD_ARTICLE_REQUEST`,
	ADD_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/ADD_ARTICLE_SUCCESS`,
	ADD_ARTICLE_ERROR: `${ appName }/${ moduleName }/ADD_ARTICLE_ERROR`,

	STOP_ARTICLE_REQUEST: `${ appName }/${ moduleName }/STOP_ARTICLE_REQUEST`,
	STOP_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/STOP_ARTICLE_SUCCESS`,
	STOP_ARTICLE_ERROR: `${ appName }/${ moduleName }/STOP_ARTICLE_ERROR`,

	DELETE_ARTICLE_REQUEST: `${ appName }/${ moduleName }/DELETE_ARTICLE_REQUEST`,
	DELETE_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/DELETE_ARTICLE_SUCCESS`,
	DELETE_ARTICLE_ERROR: `${ appName }/${ moduleName }/DELETE_ARTICLE_ERROR`,
}

export const actions = {
	addArticle: (handleResetPlace, {
		title,
		textArea,
		animals,
		category,
		city,
		price,
		phoneNumber,
		address,
		file,
		refreshName
	}) => dispatch => {
		dispatch({ type: types.ADD_ARTICLE_REQUEST })

		const token = localStorage.getItem('token')

		function sendData(url, data) {
			const formData  = new FormData()
			
			for(let name in data) {
				if (typeof data[name] === 'object') {
					data[name].forEach(file => {
						formData.append('file', file)
					})
					
				} else {
					formData.append(name, data[name])
				}
			}

			fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${ token }`
				},
				body: formData
			})
				.then(response => {
					if (response.ok) return response.json()
					return Promise.reject(response.json())
				})
				.then(result => {
					dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
					dispatch({ type: types.ADD_ARTICLE_SUCCESS })
					dispatch(push('personalArea'))
					tgReachGoal('CREATE_POST')
				})
				.catch(err => {
					err.then(res => {
						dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
						dispatch({ type: types.ADD_ARTICLE_ERROR })
					})
				})
		}

		sendData(`${ config.payPetsApiUrl }/api/feed/post`,
			{ title,
				content: textArea,
				animalType: animals,
				postType: category,
				city,
				address,
				price: Number(price) ? Number(price) : 0,
				phoneNumber,
				refreshName,
				file })
	},

	stopArticle: (url, values) => dispatch => {
		dispatch({ type: types.STOP_ARTICLE_REQUEST })
		const token = localStorage.getItem('token')

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`
			},
			body: JSON.stringify(values)
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				dispatch({ type: types.STOP_ARTICLE_SUCCESS })
				dispatch(actionsAuthReducer.getUserData(token))
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.STOP_ARTICLE_ERROR })
				})
			})
	},

	deleteArticle: url => dispatch => {
		dispatch({ type: types.DELETE_ARTICLE_REQUEST })
		const token = localStorage.getItem('token')

		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ token }`
			}
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				dispatch({ type: types.DELETE_ARTICLE_SUCCESS })
				dispatch(actionsAuthReducer.getUserData(token))
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.DELETE_ARTICLE_ERROR })
				})
			})
	}
}

const initialState = {
	fetchingAddingArticle: false,
	errorAddingArticle: false,

	fetchingStopAtricle: false,
	errorStopArticle: false,

	fetchingDeleteAtricle: false,
	errorDeleteArticle: false
}

export default (state = initialState, action) => {
	const { type } = action

	switch (type) {
	case types.ADD_ARTICLE_REQUEST: return {
		...state,
		fetchingAddingArticle: true,
		errorAddingArticle: false
	}
	case types.ADD_ARTICLE_SUCCESS: return {
		...state,
		fetchingAddingArticle: false,
		errorAddingArticle: false
	}
	case types.ADD_ARTICLE_ERROR: return {
		...state,
		fetchingAddingArticle: false,
		errorAddingArticle: true
	}

	case types.STOP_ARTICLE_REQUEST: return {
		...state,
		fetchingStopAtricle: true,
		errorStopArticle: false
	}
	case types.STOP_ARTICLE_SUCCESS: return {
		...state,
		fetchingStopAtricle: false,
		errorStopArticle: false
	}
	case types.STOP_ARTICLE_ERROR: return {
		...state,
		fetchingStopAtricle: false,
		errorStopArticle: true
	}

	case types.DELETE_ARTICLE_REQUEST: return {
		...state,
		fetchingDeleteAtricle: true,
		errorDeleteArticle: false
	}
	case types.DELETE_ARTICLE_SUCCESS: return {
		...state,
		fetchingDeleteAtricle: false,
		errorDeleteArticle: false
	}
	case types.DELETE_ARTICLE_ERROR: return {
		...state,
		fetchingDeleteAtricle: true,
		errorDeleteArticle: true
	}

	default: return state
	}
}