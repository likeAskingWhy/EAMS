<template>
    <div class="topbar-container">
        <div
                class="iconfont collapse-btn"
                @click="$store.commit('SET_COLLAPSE')"
                :class="$store.getters.isCollapse? 'icon-toggle-right': 'icon-toggle-left'"
        >
        </div>
        <Breadcrumb style="flex: 1"></Breadcrumb>
        <el-button style="float: right; margin-right: 20px" size="small" type="danger" @click="logout">退出登录</el-button>
    </div>
</template>

<script>
	import Breadcrumb from "./Breadcrumb"

	export default {
		name: "Topbar",
		components: {
			Breadcrumb
		},
    methods: {
		  logout() {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push('/login')
          this.$message.success('您已退出登录~')
        })
      }
    }
	}
</script>

<style scoped lang="scss">
    .topbar-container {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .collapse-btn {
            font-size: 20px;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            margin-right: 15px;
        }

        .collapse-btn:hover {
            background: rgba(0, 0, 0, 0.03);
            transition: 1s;
            cursor: pointer;
        }
    }
</style>