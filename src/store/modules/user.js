import {getToken, setToken} from "@/utils/token"
import {login} from "@/api/login";

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
		Login(context, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(res => {
					setToken(res.data.token)
					context.commit('SET_TOKEN', res.data.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user