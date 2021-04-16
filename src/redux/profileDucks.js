import api from '../services/api'
import { setAlert } from './alertDucks'
import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_REPOS,
	NO_REPOS,
	ACCOUNT_DELETED,
} from './types'

//CONSTANTS

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
}

//REDUCERS

export function profileReducer(state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			}
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			}
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			}
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
			}
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			}
		case NO_REPOS:
			return {
				...state,
				repos: [],
			}
		default:
			return state
	}
}

//ACTIONS

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await api.get('/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE })

	try {
		const res = await api.get('/profile')

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Get profile by ID
export const getProfileById = userId => async dispatch => {
	try {
		const res = await api.get(`/profile/user/${userId}`)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Get Github repos
export const getGithubRepos = username => async dispatch => {
	try {
		const res = await api.get(`/profile/github/${username}`)

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: NO_REPOS,
		})
	}
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const res = await api.post('/profile', formData)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const res = await api.put('/profile/experience', formData)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Experience Added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const res = await api.put('/profile/education', formData)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Education Added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await api.delete(`/profile/experience/${id}`)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Experience Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete education
export const deleteEducation = id => async dispatch => {
	try {
		const res = await api.delete(`/profile/education/${id}`)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Education Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await api.delete('/profile')

			dispatch({ type: CLEAR_PROFILE })
			dispatch({ type: ACCOUNT_DELETED })

			dispatch(setAlert('Your account has been permanently deleted'))
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}
