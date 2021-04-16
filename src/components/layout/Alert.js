import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Alert = () => {
	const alerts = useSelector(state => state.alert)
	return alerts.map(alert => (
		<div key={alert.id} className={`alert alert-${alert.alertType}`}>
			{alert.msg}
		</div>
	))
}

Alert.PropTypes = {
	alerts: PropTypes.array.isRequired,
}

export default Alert
