import api from '../services/api'
import { setAlert } from './alertDucks'
import {
	GET_POST,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POSTS,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types'

//CONSTANTS

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
}

//REDUCERS

export function postReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			}
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false,
			}
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload),
				loading: false,
			}
		case POST_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload.id
						? { ...post, likes: action.payload.likes }
						: post
				),
				loading: false,
			}
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: action.payload },
				loading: false,
			}
		case REMOVE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(
						comment => comment._id !== action.payload
					),
				},
				loading: false,
			}
		default:
			return state
	}
}

//ACTIONS

//Get posts
export const getPosts = () => async dispatch => {
	try {
		const res = await api.get('/posts')

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add like
export const addLike = id => async dispatch => {
	try {
		const res = await api.put(`/posts/like/${id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Remove like
export const removeLike = id => async dispatch => {
	try {
		const res = await api.put(`/posts/unlike/${id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete post
export const deletePost = id => async dispatch => {
	try {
		await api.delete(`/posts/${id}`)

		dispatch({
			type: DELETE_POST,
			payload: id,
		})

		dispatch(setAlert('Post Removed', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add post
export const addPost = formData => async dispatch => {
	try {
		const res = await api.post('/posts', formData)

		dispatch({
			type: ADD_POST,
			payload: res.data,
		})

		dispatch(setAlert('Post Created', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Get post
export const getPost = id => async dispatch => {
	try {
		const res = await api.get(`/posts/${id}`)

		dispatch({
			type: GET_POST,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {
	try {
		const res = await api.post(`/posts/comment/${postId}`, formData)

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		})

		dispatch(setAlert('Comment Added', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		await api.delete(`/posts/comment/${postId}/${commentId}`)

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		})

		dispatch(setAlert('Comment Removed', 'success'))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
