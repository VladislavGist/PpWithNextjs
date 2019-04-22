export const types = {
	ADD_PHOTO_0: 'PHOTOS_REDUCER/ADD_PHOTO_0',
	ADD_PHOTO_1: 'PHOTOS_REDUCER/ADD_PHOTO_1',
	ADD_PHOTO_2: 'PHOTOS_REDUCER/ADD_PHOTO_2',
	ADD_PHOTO_3: 'PHOTOS_REDUCER/ADD_PHOTO_3',
	ADD_PHOTO_4: 'PHOTOS_REDUCER/ADD_PHOTO_4',
}

export const actions = {
	handleAddPhoto_0: file => dispatch => dispatch({ type: types.ADD_PHOTO_0, payload: true, file_0: file }),
	handleAddPhoto_1: file => dispatch => dispatch({ type: types.ADD_PHOTO_1, payload: true, file_1: file }),
	handleAddPhoto_2: file => dispatch => dispatch({ type: types.ADD_PHOTO_2, payload: true, file_2: file }),
	handleAddPhoto_3: file => dispatch => dispatch({ type: types.ADD_PHOTO_3, payload: true, file_3: file }),
	handleAddPhoto_4: file => dispatch => dispatch({ type: types.ADD_PHOTO_4, payload: true, file_4: file }),

	handleResetPlace: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_0, payload: false, file_0: null })
		dispatch({ type: types.ADD_PHOTO_1, payload: false, file_1: null })
		dispatch({ type: types.ADD_PHOTO_2, payload: false, file_2: null })
		dispatch({ type: types.ADD_PHOTO_3, payload: false, file_3: null })
		dispatch({ type: types.ADD_PHOTO_4, payload: false, file_4: null })
	}
}

const initialState = {
	addPhoto: false,
	file_0: null,
	file_1: null,
	file_2: null,
	file_3: null,
	file_4: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case types.ADD_PHOTO_0: return {
		...state,
		addPhoto: action.payload,
		file_0: action.file_0
	}
	case types.ADD_PHOTO_1: return {
		...state,
		addPhoto: action.payload,
		file_1: action.file_1
	}
	case types.ADD_PHOTO_2: return {
		...state,
		addPhoto: action.payload,
		file_2: action.file_2
	}
	case types.ADD_PHOTO_3: return {
		...state,
		addPhoto: action.payload,
		file_3: action.file_3
	}
	case types.ADD_PHOTO_4: return {
		...state,
		addPhoto: action.payload,
		file_4: action.file_4
	}
	default: return state
	}
}