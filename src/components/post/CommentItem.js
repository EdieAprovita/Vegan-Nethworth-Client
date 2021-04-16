import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate'
import { deleteComment } from '../../actions/post'

const CommentItem = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.userLogin)
  
	
}

CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
}

export default CommentItem
