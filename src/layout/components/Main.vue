<template>
    <div class="main-container">
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
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
    .v-enter-active, .v-leave-avtive {
        transition: all 0.25s ease;
    }
    .v-enter, .v-leave-to {
        opacity: 0;
        transition: 0.5s;
    }
</style>