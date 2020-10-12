import {getToken, removeToken, setToken} from "@/utils/token"
import {login} from "@/api/login"
import router from "@/router"
const user = {
	state: {
		username: '',
		id: '',
		roles: [],
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
		}
	},
	actions: {
		Login({commit}, userInfo) {
			return new Promise((resolve, reject) => {
				setTimeout(function () {
					login(userInfo).then(res => {
						setToken(res.data.token)
						commit('SET_TOKEN', res.data.token)
						resolve()
					}).catch(error => {
						reject(error)
					})
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
			})).catch(error => {
				reject(error)
			})
		}
	}
}

export default user