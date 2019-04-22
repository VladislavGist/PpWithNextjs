export const types = {
	TOOLTIP: 'CONT_FORM_STATUS/TOOLTIP'
}

export const actions = {

	connectMess: url => dispatch => {
		
	}
}

export default (state = false, action) => {
	switch (action.type) {
	case types.TOOLTIP: return action.payload
	default: return state
	}
}