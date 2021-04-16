import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { getPost } from '../../actions/post'

const Post = ({ match }) => {
	const dispatch = useDispatch()

	const Post = useSelector(state => state.post)
	const { post, loading } = Post

	useEffect(() => {
		dispatch(getPost(match.params.id))
	}, [dispatch, match.params.id])

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map(comment => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</Fragment>
	)
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

export default Post
