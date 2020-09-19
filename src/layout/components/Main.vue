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
        /*height: calc(100vh - 120px);*/
        box-sizing: border-box;
        padding: 15px;
        background: #EEF0F3;
    }
</style>