import { push } from 'react-router-redux'

import { actions as actionsPreloader } from './preloader'
import { actions as actionsSnackbarReducer } from './snackbarReducer'

import { tgReachGoal } from '../analytics'
import config from '../config'

const appName = 'paypets'
export const moduleName = 'auth'

export const types = {
	AUTH_REQUEST: `${ appName }/${ moduleName }/AUTH_REQUEST`,
	AUTH_SUCCESS: `${ appName }/${ moduleName }/AUTH_SUCCESS`,
	AUTH_ERROR: `${ appName }/${ moduleName }/AUTH_ERROR`,

	REGISTRATION_REQUEST: `${ appName }/${ moduleName }/REGISTRATION_REQUEST`,
	REGISTRATION_SUCCESS: `${ appName }/${ moduleName }/REGISTRATION_SUCCESS`,
	REGISTRATION_ERROR: `${ appName }/${ moduleName }/REGISTRATION_ERROR`,

	UPDATE_USER_DATA_REQUEST: `${ appName }/${ moduleName }/UPDATE_USER_DATA_REQUEST`,
	UPDATE_USER_DATA_SUCCESS: `${ appName }/${ moduleName }/UPDATE_USER_DATA_SUCCESS`,
	UPDATE_USER_DATA_ERROR: `${ appName }/${ moduleName }/UPDATE_USER_DATA_ERROR`,

	RESET_PASSWORD_REQUEST: `${ appName }/${ moduleName }/RESET_PASSWORD_REQUEST`,
	RESET_PASSWORD_SUCCESS: `${ appName }/${ moduleName }/RESET_PASSWORD_SUCCESS`,
	RESET_PASSWORD_ERROR: `${ appName }/${ moduleName }/RESET_PASSWORD_ERROR`,

	LOGOUT_REQUEST: `${ appName }/${ moduleName }/LOGOUT_REQUEST`
}

export const actions = {
	loginFalse: () => dispatch => {
		dispatch({ type: types.LOGOUT_REQUEST })
		localStorage.removeItem('token')
		dispatch(push('/'))
	},

	getUserData: storageToken => dispatch => {
		fetch(`${ config.payPetsApiUrl }/api/auth/getUserData`, {
			headers: {
				'Authorization': `Bearer ${ storageToken }`
			}
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(user => {
				dispatch({ type: types.AUTH_SUCCESS, user })
			})
	},

	loginAction: ({ email, password }) => dispatch => {
		dispatch(actionsPreloader.handleUpdateStateLoading(80))
		dispatch({ type: types.AUTH_REQUEST })

		fetch(`${ config.payPetsApiUrl }/api/auth/login`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(user => {
				const { token } = user
				dispatch(actionsPreloader.handleUpdateStateLoading(100))

				localStorage.setItem('token', token)
				dispatch({ type: types.AUTH_SUCCESS, user })
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsPreloader.handleUpdateStateLoading(100))
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.AUTH_ERROR })
				})
			})
	},

	signUp: ({ email, password, name, lastName, city }) => dispatch => {
		dispatch(actionsPreloader.handleUpdateStateLoading(80))
		dispatch({ type: types.REGISTRATION_REQUEST })

		fetch(`${ config.payPetsApiUrl }/api/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password,
				name,
				lastName,
				city
			})
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsPreloader.handleUpdateStateLoading(100))
				dispatch({ type: types.REGISTRATION_SUCCESS })
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				tgReachGoal('REGISTRATION_SUCCESS')
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsPreloader.handleUpdateStateLoading(100))
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.REGISTRATION_ERROR })
					tgReachGoal('REGISTRATION_FAIL')
				})
			})
	},

	updateUserData: (url, values) => dispatch => {
		dispatch({ type: types.UPDATE_USER_DATA_REQUEST })
		dispatch(actionsPreloader.handleUpdateStateLoading(80))

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
			.then(updateUserData => {
				dispatch({ type: types.UPDATE_USER_DATA_SUCCESS, updateUserData })
				dispatch(actionsPreloader.handleUpdateStateLoading(100))
				dispatch(actionsSnackbarReducer.handleSnackbar('Данные успешно изменены'))
			})
			.catch(err => {
				err
					.than(res => {
						dispatch({ type: types.UPDATE_USER_DATA_ERROR })
						dispatch(actionsPreloader.handleUpdateStateLoading(100))
						dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					})
			})
	},

	resetPassword: url => dispatch => {
		dispatch(actionsPreloader.handleUpdateStateLoading(80))
		dispatch({ type: types.RESET_PASSWORD_REQUEST })

		fetch(url)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsPreloader.handleUpdateStateLoading(100))
				dispatch({ type: types.RESET_PASSWORD_SUCCESS })
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				tgReachGoal('RESET_PASSWORD_SUCCESS')

			})
			.catch(err => {
				tgReachGoal('RESET_PASSWORD_FAIL')
				err.then(res => {
					dispatch(actionsPreloader.handleUpdateStateLoading(100))
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.RESET_PASSWORD_ERROR })
				})
			})
	},

	addNewPassword: ({ url, password, token }) => dispatch => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, token })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsPreloader.handleUpdateStateLoading(100))
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				tgReachGoal('ADD_NEW_PASSWORD_SUCCESS')
			})
			.catch(err => {
				tgReachGoal('ADD_NEW_PASSWORD_FAIL')
				err.then(res => {
					dispatch(actionsPreloader.handleUpdateStateLoading(100))
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
				})
			})
	}
}

const initialState = {
	user: null,
	userError: false,
	userLoading: false,

	fetchingResetPassword: false,
	errorFetchingResetPassword: false
}

export default (state = initialState, action) => {
	const { type, user } = action

	switch (type) {
	case types.AUTH_REQUEST: return {
		...state,
		userLoading: true,
		userError: false
	}
	case types.AUTH_SUCCESS: return {
		...state,
		userLoading: false,
		userError: false,
		user
	}
	case types.AUTH_ERROR: return {
		...state,
		userError: true,
		userLoading: false
	}

	case types.REGISTRATION_REQUEST: return {
		userLoading: true,
		userError: false
	}
	case types.REGISTRATION_SUCCESS: return {
		userLoading: false,
		userError: false
	}
	case types.REGISTRATION_ERROR: return {
		userError: true,
		userLoading: false
	}

	case types.UPDATE_USER_DATA_REQUEST: return {
		...state,
		userError: false,
		userLoading: true
	}
	case types.UPDATE_USER_DATA_SUCCESS: return {
		...state,
		user: {
			...state.user,
			...action.updateUserData
		},
		userError: false,
		userLoading: false
	}
	case types.UPDATE_USER_DATA_ERROR: return {
		...state,
		userError: true,
		userLoading: false
	}

	case types.RESET_PASSWORD_REQUEST: return {
		...state,
		fetchingResetPassword: true,
		errorFetchingResetPassword: false
	}
	case types.RESET_PASSWORD_SUCCESS: return {
		...state,
		fetchingResetPassword: false,
		errorFetchingResetPassword: false
	}
	case types.RESET_PASSWORD_ERROR: return {
		...state,
		fetchingResetPassword: true,
		errorFetchingResetPassword: true
	}

	case types.LOGOUT_REQUEST: return {
		user: null,
		userLoading: false,
		userError: false
	}

	default: return state
	}
}