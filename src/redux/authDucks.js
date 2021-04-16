import api from '../utils/api'
import { setAlert } from './alertDucks'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGOUT,
	ACCOUNT_DELETED,
} from './types'

//REDUCERS

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
}

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case ACCOUNT_DELETED:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			}
		case AUTH_ERROR:
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			}
		default:
			return state
	}
}

//ACTIONS

export const loadUser = () => async dispatch => {
	try {
		const res = await api.get('/auth')

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

// Register User
export const register = formData => async dispatch => {
	try {
		const res = await api.post('/users', formData)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})
		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: REGISTER_FAIL,
		})
	}
}

// Login User
export const login = (email, password) => async dispatch => {
	const body = { email, password }

	try {
		const res = await api.post('/auth', body)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})

		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

// Logout
export const logout = () => ({ type: LOGOUT })
