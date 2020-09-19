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
			state.tabList = payload.tabs.filter(tab => tab.name !== payload.targetName)
		},
		CLOSE_ALL_TABS(state) {
			state.tabList = [state.tabList[0]]
			router.push({name: state.tabList[0].name})
		},
		CLOSE_LEFT_TABS(state, tabName) {
			state.tabList.forEach((v, i) => {
				if (v.name === tabName) state.tabList.splice(1, i - 1)
			})
		},
		CLOSE_RIGHT_TABS(state, tabName) {
			state.tabList.forEach((v, i) => {
				if (v.name === tabName) state.tabList.splice(1 + 1, state.tabList.length - 1)
			})
		},
		CLOSE_OTHER_TABS(state, tabName) {
			const middleTabList = [state.tabList[0]]
			state.tabList.forEach(v => {
				if (v.name === tabName) {
					middleTabList.push(v)
					state.tabList = middleTabList
				}
			})
		}
	}
}

export default tabs