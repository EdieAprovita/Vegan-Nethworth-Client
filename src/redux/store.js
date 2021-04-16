import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './authDucks'
import { postReducer } from './postDucks'
import { profileReducer } from './profileDucks'
import { alertReducer } from './alertDucks'
import setAuthToken from '../utils/setAuthoken'

const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	profile: profileReducer,
	post: postReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

let currentState = store.getState()

store.subscribe(() => {
	// keep track of the previous and current state to compare changes
	let previousState = currentState
	currentState = store.getState()
	// if the token changes set the value in localStorage and axios headers
	if (previousState.auth.token !== currentState.auth.token) {
		const token = currentState.auth.token
		setAuthToken(token)
	}
})

export default store
