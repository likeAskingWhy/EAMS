<template>
    <div class="common-card">
        <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "CommonCard"
	}
</script>

<style scoped lang="scss">
    .common-card {
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 20px;
    }
</style>