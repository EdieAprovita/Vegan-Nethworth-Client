import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileEducation = () => {
	const education = useSelector(state => state.profile.education)
	const { school, degree, fieldofstudy, current, to, from, description } = education

	return (
		<div>
			<h3 className='text-dark'>{school}</h3>
			<p>
				{formatDate(from)} - {to ? formatDate(to) : 'Now'}
			</p>
			<p>
				<strong>Degree: </strong> {degree}
			</p>
			<p>
				<strong>Field Of Study: </strong> {fieldofstudy}
			</p>
			<p>
				<strong>Description: </strong> {description}
			</p>
		</div>
	)
}

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
}

export default ProfileEducation
