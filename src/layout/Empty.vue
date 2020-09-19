<template>
    <transition mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<style scoped lang="scss">
    .v-enter-active, .v-leave-avtive {
        transition: all 0.25s ease;
    }
    .v-enter, .v-leave-to {
        opacity: 0;
        transition: 0.5s;
    }
</style>