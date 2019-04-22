export const types = {
	PRELOADER_UPDATE_LOADING: 'PRELOADER/UPDATE_LOADING'
}

export const actions = {
	handleUpdateStateLoading: e => ({ type: types.PRELOADER_UPDATE_LOADING, payload: e })
}

export default (state = { loading: 0 }, action) => {
	switch (action.type) {

	case types.PRELOADER_UPDATE_LOADING: return {
		...state,
		loading: action.payload
    }
    
    default: return state
    
	}
}