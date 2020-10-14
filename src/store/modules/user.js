import {getToken, removeToken, setToken} from "@/utils/token"
import {login} from "@/api/login"
import {getUserDetail} from "@/api/system/user"

import router from "@/router"
const user = {
	state: {
		username: '',
		id: '',
		roles: [],
		avatar: '',
		permissions: [],
		token: getToken()
	},
	mutations: {
		SET_USERNAME(state, username) {
			state.username = username
		},
		SET_ID(state, id) {
			state.id = id
		},
		SET_ROLES(state, roles) {
			state.roles = roles
		},
		SET_PERMISSIONS(state, permissions) {
			state.permissions = permissions
		},
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_AVATAR(state, avatar) {
			state.avatar = avatar
		}
	},
	actions: {
		Login({commit}, userInfo) {
			return new Promise((resolve, reject) => {
				setTimeout(function () {
					login(userInfo).then(res => {
						setToken(res.data.token)
						commit('SET_TOKEN', res.data.token)
						commit('SET_ID', res.data._id)
						resolve()
					}).catch(error => reject(error))
				}, 1000)
			})
		},
		Logout({commit}) {
			return new Promise(((resolve, reject) => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				commit('SET_PERMISSIONS', [])
				removeToken()
				resolve()
			})).catch(error => reject(error))
		},
		GetInfo({commit, state}) {
			return new Promise(((resolve, reject) => {
				getUserDetail(state.id).then(res => {
					const {data} = res
					if (!data) reject('未获取到用户信息，请重新登录系统！')
					const {roles, avatar, username} = data
					if (!roles || roles.length <= 0) reject('角色信息异常，roles应该是一个非空数组！')
					commit('SET_ROLES', roles)
					commit('SET_USERNAME', username)
					commit('SET_AVATAR', avatar)
					resolve(data)
				}).catch(error => reject(error))
			}))
		}
	}
}

export default user