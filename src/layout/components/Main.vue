<template>
    <div class="main-container">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "Main"
	}
</script>

<style scoped lang="scss">
    .main-container {
        box-sizing: border-box;
        padding: 20px;
        height: calc(100% - 120px);
    }
</style>