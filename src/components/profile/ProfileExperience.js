import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate'

const ProfileExperience = () => {
	const experience = useSelector(state => state.profile.experience)
	const { company, title, location, current, to, from, description } = experience

	return (
		<div>
			<h3 className='text-dark'>{company}</h3>
			<p>
				{formatDate(from)} - {to ? formatDate(to) : 'Now'}
			</p>
			<p>
				<strong>Position: </strong> {title}
			</p>
			<p>
				<strong>Location: </strong> {location}
			</p>
			<p>
				<strong>Description: </strong> {description}
			</p>
		</div>
	)
}

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
}

export default ProfileExperience
