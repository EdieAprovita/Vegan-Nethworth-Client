import axios from 'axios'

export default axios.create({
	baseURL: 'https://vegan-networth.herokuapp.com/api',
})
