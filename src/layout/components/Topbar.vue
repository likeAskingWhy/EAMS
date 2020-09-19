<template>
    <div class="topbar-container">
        <div
                class="iconfont collapse-btn"
                @click="$store.commit('SET_COLLAPSE')"
                :class="$store.getters.isCollapse? 'icon-toggle-right': 'icon-toggle-left'"
        >
        </div>
        <Breadcrumb></Breadcrumb>
    </div>
</template>

<script>
	import Breadcrumb from "./Breadcrumb"

	export default {
		name: "Topbar",
		components: {
			Breadcrumb
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