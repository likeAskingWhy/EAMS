import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import {getToken} from "@/utils/token";

const request = axios.create({
	baseURL: 'http://192.168.1.144:3005/v1/api',
	timeout: 5000
})

request.interceptors.request.use(config => {
	if (getToken()) config.headers.Authorization = 'Bearer ' + getToken()
	return config
}, error => {
	return Promise.reject(error)
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