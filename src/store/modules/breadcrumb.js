const breadcrumb = {
	state: {
		breadcrumb: []
	},
	mutations: {
		SET_BREADCRUMB(state, breadcrumb) {
			state.breadcrumb = breadcrumb
		}
	}
}
export default breadcrumb