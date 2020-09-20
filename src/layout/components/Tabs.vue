<template>
    <div class="tabs-contaner">
        <div class="tabs-options">
            <el-dropdown
                    @visible-change="isVisibleChanged = !isVisibleChanged"
                    placement="top"
                    @command="handleCommand">
                <el-button
                        type="primary"
                        :icon="isVisibleChanged? 'el-icon-arrow-up':'el-icon-arrow-down'">
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="closeLeftTabs">关闭左侧</el-dropdown-item>
                    <el-dropdown-item :command="closeRightTabs">关闭右侧</el-dropdown-item>
                    <el-dropdown-item :command="closeOtherTabs">关闭其它</el-dropdown-item>
                    <el-dropdown-item :command="closeAllTabs">关闭全部</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="tabs-tag">
            <el-tabs
                    :value="$route.name" type="card"
                    @tab-remove="removeTab"
                    @tab-click="handleClick">
                <el-tab-pane
                        :key="item.name"
                        v-for="item in $store.getters.tabList"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.name === 'Layout'? false : true"
                >
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
	export default {
		name: "Tabs",
		watch: {
			'$route'(to) {
				const tab = {
					name: to.name,
					title: to.meta.title,
				}
				const flag = this.$store.getters.tabList.every(item => {
					return item.name !== to.name
				})
				if (flag) this.$store.commit('SET_TABLIST', tab)
				this.tabControl.tabName = to.name
			}
		},
		data() {
			return {
				isVisibleChanged: false,
				// tab标签初始控件
				tabControl: {
					tabName: 'Layout',
				}
			}
		},
		methods: {
			// 通过Name进行路由跳转
			handleClick(tab) {
				this.$router.push({name: tab.name})
			},
			// 关闭标签时调用
			removeTab(targetName) {
				let tabs = this.$store.getters.tabList
				let activeName = this.tabControl.tabName
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name
							}
						}
					})
				}
				this.tabControl.tabName = activeName
				this.$router.push({name: this.tabControl.tabName})
				this.$store.commit('FILTER_TABLIST', {
					tabs,
					targetName
				})
			},
			//关闭当前页左侧标签
			closeLeftTabs() {
				this.$store.commit('CLOSE_LEFT_TABS', this.tabControl.tabName)
			},
			//关闭当前页右侧标签
			closeRightTabs() {
				this.$store.commit('CLOSE_RIGHT_TABS', this.tabControl.tabName)
			},
			//关闭其它标签
			closeOtherTabs() {
				this.$store.commit('CLOSE_OTHER_TABS', this.tabControl.tabName)
			},
			//关闭所有标签
			closeAllTabs() {
				this.$store.commit('CLOSE_ALL_TABS')
			},
			handleCommand(fun) {
				return fun()
			},
		}
	}
</script>

<style scoped lang="scss">
    .tabs-contaner {
        height: 40px;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 15px;
        .tabs-options {
            .el-dropdown {
                .el-button {
                    border-radius: 0;
                    width: 25px;
                    padding: 0;
                    height: 30px;
                }
            }
        }
        .tabs-tag {
            /deep/ .el-tabs__header {
                margin: 0;
                border-bottom: none;
                .el-tabs__nav {
                    border: none !important;
                    .el-tabs__item {
                        font-family: '微软雅黑';
                        font-size: 14px;
                        color: #8c939d;
                        height: 30px;
                        border: 1px solid #409EFF;
                        padding: 0 10px;
                        line-height: 30px;
                        margin-left: 5px;
                    }
                    .is-active {
                        background: #409EFF !important;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>