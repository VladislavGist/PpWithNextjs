import fetch from 'isomorphic-unfetch'
import { actions as actionsTypes } from './preloader'
import config from '../config'

const appName = 'paypets'
export const moduleName = 'articles'

import { types as allParamsUrlTypes } from './allParamsUrl'
import { actions as actionsAuth } from './auth'
import { actions as actionsSnackbarReducer } from './snackbarReducer'

import { tgReachGoal } from '../analytics'

export const types = {
	FETCH_ARTICLES_START: `${ appName }/${ moduleName }/FETCH_ARTICLES_START`,
	FETCH_ARTICLES_SUCCESS: `${ appName }/${ moduleName }/FETCH_ARTICLES_SUCCESS`,
	FETCH_ARTICLES_ERROR: `${ appName }/${ moduleName }/FETCH_ARTICLES_ERROR`,
	FETCH_ARTICLES_CLEAR: `${ appName }/${ moduleName }/FETCH_ARTICLES_CLEAR`,

	CHANGE_CURRENT_PAGE_PAGINATION: `${ appName }/${ moduleName }/CHANGE_CURRENT_PAGE_PAGINATION`,

	FETCH_OPENED_CARD_START: `${ appName }/${ moduleName }/FETCH_OPENED_CARD_START`,
	FETCH_OPENED_CARD_SUCCESS: `${ appName }/${ moduleName }/FETCH_OPENED_CARD_SUCCESS`,
	FETCH_OPENED_CARD_ERROR: `${ appName }/${ moduleName }/FETCH_OPENED_CARD_ERROR`
}

const initialState = {
	errorFetch: false,
	loadingFetch: false,
	currentPagePagination: 1,
	articlesList: [],
	totalItems: 0,
	fetchingOpenedCard: false,
	errorFetchOpenedCard: false,
	openedCard: {}
}

export default (state = initialState, action) => {
	const {
		type,
		articles,
		totalItems,
		currentPagePagination,
		openedCard
	} = action

	switch (type) {
	case types.FETCH_ARTICLES_START: return {
		...state,
		errorFetch: false,
		loadingFetch: true,
		articlesList: [],
		totalItems: 0
	}
	case types.FETCH_ARTICLES_SUCCESS: return {
		...state,
		errorFetch: false,
		loadingFetch: false,
		articlesList: articles,
		totalItems
	}
	case types.FETCH_ARTICLES_ERROR: return {
		...state,
		errorFetch: true,
		loadingFetch: false,
		currentPagePagination: 1,
		articlesList: [],
		totalItems: 0
	}
	case types.FETCH_ARTICLES_CLEAR: return {
		...state,
		errorFetch: false,
		loadingFetch: false,
		articlesList: [],
		currentPagePagination: 1,
		totalItems: 0
	}

	case types.CHANGE_CURRENT_PAGE_PAGINATION: return {
		...state,
		currentPagePagination: currentPagePagination
	}

	case types.FETCH_OPENED_CARD_START: return {
		...state,
		fetchingOpenedCard: true,
		errorFetchOpenedCard: false,
		openedCard: {}
	}

	case types.FETCH_OPENED_CARD_SUCCESS: return {
		...state,
		fetchingOpenedCard: false,
		errorFetchOpenedCard: false,
		openedCard
	}

	case types.FETCH_OPENED_CARD_ERROR: return {
		...state,
		fetchingOpenedCard: false,
		errorFetchOpenedCard: true,
		openedCard: {}
	}

	default: return state
	}
}

export const actions = {
	getCards: ({ city, animalType, postType, page, active, moderate }) => async dispatch => {
		dispatch({ type: types.FETCH_ARTICLES_START })
		dispatch(actionsTypes.handleUpdateStateLoading(80))

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }&` : ''
		const animalTypeQuerySearch = animalType ? `animalType=${ animalType }&` : ''
		const postTypeTypeQuerySearch = postType ? `postType=${ postType }&` : ''
		const pageQuerySearch = page ? `page=${ page }&` : `page=1&`
		const activeQuerySearch = active || active === false ? `active=${ active }&` : 'active=true&'
		const moderateQuerySearch = moderate ? `moderate=${ moderate }&` : 'moderate=resolve&'

		const resultSearchQuery = `
			${ cityQuerySearch }
			${ animalTypeQuerySearch }
			${ postTypeTypeQuerySearch }
			${ pageQuerySearch }
			${ activeQuerySearch }
			${ moderateQuerySearch }
		`

		await fetch(`${ config.payPetsApiUrl }/api/feedRead/posts?${ resultSearchQuery }`)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(articles => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
				dispatch({
					type: types.FETCH_ARTICLES_SUCCESS,
					articles: articles.posts,
					totalItems: articles.totalItems
				})
			})
			.catch(err => {
				err
					.then(res => {
						dispatch(actionsTypes.handleUpdateStateLoading(100))
						dispatch({ type: types.FETCH_ARTICLES_ERROR })
						dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					})
			})
	},

	getOpenedCard: id => dispatch => {
		dispatch({ type: types.FETCH_OPENED_CARD_START })
		dispatch(actionsTypes.handleUpdateStateLoading(80))

		fetch(`${ config.payPetsApiUrl }/api/feedRead/post/${ id }`)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(openedCard => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
				dispatch({
					type: types.FETCH_OPENED_CARD_SUCCESS,
					openedCard
				})
			})
			.catch(err => {
				err
					.then(res => {
						dispatch(actionsTypes.handleUpdateStateLoading(100))
						dispatch({ type: types.FETCH_OPENED_CARD_ERROR })
						dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					})
			})
	},

	moderateCard: (url, cardId, status) => dispatch => {
		const token = localStorage.getItem('token')

		fetch(url, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${ token }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ postId: cardId, status })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject('Не удалось изменить статус объявления')
			})
			.then(result => {
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				dispatch(actions.getCards({ moderate: 'pending' }))
			})
			.catch(err => dispatch(actionsSnackbarReducer.handleSnackbar(err.message)))
	},

	changePage: currentPagePagination => dispatch => {
		dispatch({ type: types.CHANGE_CURRENT_PAGE_PAGINATION, currentPagePagination })
	},

	onHandleClearState: () => ({ type: types.FETCH_ARTICLES_CLEAR }),

	editArticle: (
		handleResetPlace, {
			changePostId,
			title,
			textArea,
			animals,
			category,
			city,
			address,
			price,
			phoneNumber,
			file,
			refreshName
		}) => dispatch => {
		dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_REQUEST })

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
				method: 'PUT',
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
					dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_SUCCESS })

					dispatch(actionsAuth.getUserData(token))
					dispatch(handleResetPlace)
					tgReachGoal('CHANGE_POST')
				})
				.catch(err => {
					dispatch(actionsSnackbarReducer.handleSnackbar(err.message))
					dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_ERROR })
				})
		}

		sendData(`${ config.payPetsApiUrl }/api/feed/post/${ changePostId }`,
			{
				title,
				content: textArea,
				animalType: animals,
				postType: category,
				city,
				address,
				price: Number(price) ? Number(price) : 0,
				phoneNumber,
				refreshName,
				file
			})
	},

	deleteImage: ({ changePostId, path }) => dispatch => {
		const token = localStorage.getItem('token')

		dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_REQUEST })

		fetch(`${ config.payPetsApiUrl }/api/feed/deletePostImage/${ changePostId }`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${ token }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ imageUrl: path })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_SUCCESS })

				dispatch(actionsAuth.getUserData(token))
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: allParamsUrlTypes.ADD_ARTICLE_ERROR })
				})
			})
	}
}