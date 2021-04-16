import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

//CONSTANTS

const initialState = []

//REDUCERS

export function alertReducer(state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case SET_ALERT:
			return [...state, payload]
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== payload)
		default:
			return state
	}
}

//ACTIONS

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
	const id = uuidv4()
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	})

	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}
