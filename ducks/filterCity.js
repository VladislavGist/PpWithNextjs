import { actions as actionsSnackbarReducer } from './snackbarReducer'
import config from '../config'

const appName = 'paypets'
const moduleName = 'filterCity'

export const types = {
	START_FETCH_CITYS_LIST: `${ appName }/${ moduleName }/START_FETCH_CITYS_LIST`,
	SUCCESS_FETCH_CITYS_LIST: `${ appName }/${ moduleName }/SUCCESS_FETCH_CITYS_LIST`,
	ERROR_FETCH_CITYS_LIST: `${ appName }/${ moduleName }/ERROR_FETCH_CITYS_LIST`,
	REPLACE_CITY: `${ appName }/${ moduleName }/REPLACE_CITY`
}

export const actions = {
	fetchCitysList: () => dispatch => {
		dispatch({ type: types.START_FETCH_CITYS_LIST })

		fetch(`${ config.payPetsApiUrl }/api/other/allCitysList`)
			.then(result => result.json())
			.then(cityList => {

				dispatch({ type: types.SUCCESS_FETCH_CITYS_LIST, cityList })
			})
			.catch(() => {
				dispatch({ type: types.ERROR_FETCH_CITYS_LIST })
				dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка при загрузке списка городов'))
			})
	},
	dispatchCityTopHeader: e => ({ type: types.REPLACE_CITY, payload: e })
}

const initialState = {
	cityTopHeader: 'Все регионы',
	isFetching: false,
	errorFetching: false,
	cityList: []
}

export default (state = initialState, action) => {
	switch (action.type) {
	case types.START_FETCH_CITYS_LIST: return {
		...state,
		isFetching: true,
		errorFetching: false,
		cityList: []
	}
	case types.SUCCESS_FETCH_CITYS_LIST: return {
		...state,
		isFetching: false,
		errorFetching: false,
		cityList: action.cityList.finalList
	}
	case types.ERROR_FETCH_CITYS_LIST: return {
		...state,
		isFetching: false,
		errorFetching: true
	}
	case types.REPLACE_CITY: return {
		...state,
		cityTopHeader: action.payload
	}
	default: return state
	}
}