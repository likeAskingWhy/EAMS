<template>
    <div class="sidebar-container" :style="{width: isCollapse? '64px' : '200px'}">
        <div class="aside-logo">
            <i class="el-icon-magic-stick"></i>
            <span v-if="!isCollapse">EAMS</span>
        </div>
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical"
                background-color="#304156"
                text-color="#bfcbd9"
                mode="vertical"
                :collapse="isCollapse"
                :collapse-transition="false"
                router
                unique-opened>
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">系统首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>学籍管理</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
	export default {
		name: "Sidebar",
		computed: {
			isCollapse() {
				return this.$store.state.sidebar.isCollapse
			}
		}
	}
</script>

<style scoped lang="scss">
    .sidebar-container {
        width: 200px;
        height: 100%;
        .aside-logo {
            font-size: 30px;
            color: #fff;
            text-align: center;
            line-height: 50px;
            font-family: "Comic Sans MS";
            letter-spacing: 3px;
            background: #2B2F3A;
            cursor: pointer;
            transition: 0.5s;
        }
        .el-menu {
            box-sizing: border-box;
            border: none;
            height: calc(100vh - 50px);
            .el-menu-item {
                border-right: 4px solid transparent;
            }
            .is-active {
                border-color: #409EFF !important;
                background-color: rgba($color: #000000, $alpha: 0.2) !important;
            }
        }

    }
</style>