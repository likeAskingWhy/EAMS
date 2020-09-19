<template>
    <div class="home-container">
        <el-container>
            <el-aside :width="isCollapse? '64px' : '200px'">
                <div class="aside-logo">
                    <i class="el-icon-magic-stick"></i>
                    <span v-if="!isCollapse">EAMS</span>
                </div>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" collapse-transition>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="iconfont icon-toggle-left collapse-btn" @click="isCollapse = !isCollapse"></div>

                </el-header>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>

	export default {
		name: 'Home',
        data() {
			return {
				isCollapse: false
            }
        }
	}
</script>

<style lang="scss" scoped>
    .el-header {
        height: 50px !important;
        padding: 0;
        /*box-sizing: border-box;*/
        /*border-bottom: 1px solid #ddd;*/
        .collapse-btn {
            font-size: 20px;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
        }
        .collapse-btn:hover {
            background: rgba(0, 0, 0, 0.03);
            transition: 1s;
            cursor: pointer;
        }
    }

    .el-aside {
        background: transparent;
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
        .el-menu-vertical-demo {
            height: calc(100vh - 50px);
            background-color: #304156;
            transition: 0.5s;
            border: none;
        }
    }

    .el-main {
        background-color: #EEF0F3;
        padding: 0;
    }
    .el-footer {
        height: 30px !important;
        box-sizing: border-box;
        border-top: 1px solid #ddd;
    }
</style>