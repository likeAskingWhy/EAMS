const tabs = {
	state: {
		tabList: [{
			name: 'Layout',
			title: '系统首页',
		}]
	},
	mutations: {
		SET_TABLIST(state, tabList) {
			state.tabList.push(tabList)
		},
		FILTER_TABLIST(state, payload) {
			state.routesTab = payload.tabs.filter(tab => tab.name !== payload.targetName)
		},
		CLOSE_ALL_TABS(state) {
			state.routesTab = [state.routesTab[0]]
			router.push({name: state.routesTab[0].name})
		},
		CLOSE_LEFT_TABS(state, tabName) {
			state.routesTab.forEach((v, i) => {
				if (v.name === tabName) state.routesTab.splice(1, i - 1)
			})
		},
		CLOSE_RIGHT_TABS(state, tabName) {
			state.routesTab.forEach((v, i) => {
				if (v.name === tabName) state.routesTab.splice(1 + 1, state.routesTab.length - 1)
			})
		},
		CLOSE_OTHER_TABS(state, tabName) {
			const middleRoutesTab = [state.routesTab[0]]
			state.routesTab.forEach(v => {
				if (v.name === tabName) {
					middleRoutesTab.push(v)
					state.routesTab = middleRoutesTab
				}
			})
		}
	}
}

export default tabs