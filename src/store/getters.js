const getters = {
	isCollapse: state => state.sidebar.isCollapse,
	tabList: state => state.tabs.tabList,
	roles: state => state.user.roles
}

export default getters