<template>
    <el-form label-width="100px">
        <el-form-item label="用户名">
            <el-input type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
            <el-input type="password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input type="text" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
            <el-cascader
                    placeholder="请选择所属部门"
                    :show-all-levels="true"
                    clearable
                    v-model="id"
                    style="width: 100%"
                    :options="parentDepartment"
                    :props="{ expandTrigger: 'hover' }">
            </el-cascader>
        </el-form-item>
        <el-form-item label="上级部门">

        </el-form-item>
    </el-form>
</template>

<script>
	import {user_tree_data} from "../../../../resource/tree";

	export default {
		name: "Form",
		data() {
			return {
				id: [],
				parentDepartment: []
			}
		},
		created() {
			this.parentDepartment = user_tree_data
		}
	}
</script>
