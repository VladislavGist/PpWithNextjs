export const types = {
	COUNT_CARDS_TRUE: 'TOGGLE_ADD_MORE_BTN/COUNT_CARDS_TRUE',
	COUNT_CARDS_FALSE: 'TOGGLE_ADD_MORE_BTN/COUNT_CARDS_FALSE'
}

export default (state = false, action) => {
	switch (action.type) {
	case types.COUNT_CARDS_TRUE: return action.payload
	case types.COUNT_CARDS_FALSE: return action.payload
	default: return state
	}
}