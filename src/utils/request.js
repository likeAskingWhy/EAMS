import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const request = axios.create({
	baseURL: 'http://192.168.2.100:3005/v1/api',
	timeout: 5000
})

request.interceptors.response.use(res => {
	return res
}, error => {
	if (error.response.data.message) {
		Vue.prototype.$message.error(error.response.data.message)
	}
	if (error.response.status === 401) {
		router.push('/login')
	}
	return Promise.reject(error)
})

export default request