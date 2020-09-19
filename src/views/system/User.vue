<template>
    <div class="user-container">
        <span>用户管理</span>
    </div>
</template>

<script>
	export default {
		name: "User",
        created() {
	        console.log(111);
	        console.log(this.$route);
        }
	}
</script>

<style scoped lang="scss">

</style>