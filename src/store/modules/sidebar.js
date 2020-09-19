const sidebar = {
	state: {
		isCollapse: false
	},
	mutations: {
		SET_COLLAPSE(state) {
			state.isCollapse = !state.isCollapse
		}
	}
}

export default sidebar