const user = {
	state: {
		username: '',
		id: '',
		roles: [],
		permissions: [],
		token: ''
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
	}
}

export default user