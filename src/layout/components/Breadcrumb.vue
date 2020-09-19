<template>
    <div class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动介绍</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
	export default {
		name: "Breadcrumb"
	}
</script>

<style scoped lang="">

</style>