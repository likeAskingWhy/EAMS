<template>
    <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false" :width="dialogWidth">
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogEnsure">确 定</el-button>
        </span>
        <el-form
                label-width="100px"
                :model="form"
                ref="form"
                :rules="formRules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名：" prop="username">
                        <el-input
                                :disabled="dialogTitle !== '新增用户'"
                                clearable
                                v-model="form.username"
                                type="text"
                                placeholder="请输入用户名"
                                @focus="showTips = true"
                                @blur="showTips = false"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <span
                            style="line-height: 40px; margin-left: 10px; color: #8c939d"
                            v-if="showTips">用户名将作为登录系统的初始密码，且无法修改！</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="真实姓名：" prop="name">
                        <el-input
                                clearable
                                v-model="form.name"
                                type="text"
                                placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号：" prop="phone">
                        <el-input
                                clearable
                                v-model="form.phone"
                                type="text"
                                placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户类型：" prop="user_type">
                        <el-select
                                v-model="form.user_type"
                                clearable
                                style="width: 100%">
                            <el-option
                                    v-for="type in userTypeSelections"
                                    :label="type.label"
                                    :value="type.value"
                                    :key="type.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属部门：" prop="department">
                        <el-cascader
                                placeholder="若无部门请选择教师组或学生组"
                                :show-all-levels="true"
                                clearable
                                :collapse-tags="true"
                                v-model="form.department"
                                style="width: 100%"
                                :options="departments"
                                :props="props">
                        </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注：">
                        <el-input
                                v-model="form.remark"
                                type="textarea"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
	import {user_tree_data} from "../../../resource/tree"
	import {status_type_selections, user_type_selections, sex_type_selections} from "../../../resource/selection"

	export default {
		name: "Form",
		props: {
			form: {
				type: Object,
				default() {
					return {}
				}
			},
			dialogTitle: {
				type: String,
				required: true
			},
			dialogVisible: {
				type: Boolean,
				default: false
			},
			dialogWidth: {
				type: String,
				default: '40%'
			}
		},
		data() {
			return {
				departments: [],
				userTypeSelections: [],
				sexTypeSelections: [],
				statusTypeSelections: [],
				showTips: false,
				props: {
					expandTrigger: 'click',
					value: 'label'
				},
				formRules: {
					username: [
						{required: true, message: '用户名为必填项，不能为空！', trigger: 'blur'}
					],
					name: [
						{required: true, message: '真实姓名为必填项，不能为空！', trigger: 'blur'}
					],
					phone: [
						{required: true, message: '手机号为必填项，不能为空！', trigger: 'blur'}
					],
					user_type: [
						{required: true, message: '用户类型为必填项，不能为空！', trigger: 'blur'}
					],
					department: [
						{required: true, message: '所属部门为必填项，不能为空！', trigger: 'blur'}
					],
				}
			}
		},
		methods: {
			dialogCancel() {
				this.$refs.form.clearValidate()
				this.$emit('dialogCancel')
			},
			dialogEnsure() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.form.password = this.form.username
						this.$emit('dialogEnsure', this.form)
					} else {
						this.$message.warning('请将必填项信息补充完整后再提交！')
						return false
					}
				})
			}
		},
		created() {
			this.departments = user_tree_data
			this.userTypeSelections = user_type_selections
			this.sexTypeSelections = sex_type_selections
			this.statusTypeSelections = status_type_selections
		}
	}
</script>

<style scoped lang="scss">
    /deep/ .el-dialog {
        border-radius: 5px;

        .el-dialog__header {
            background-color: #409EFF;
            border-radius: 5px 5px 0 0;
            padding: 12px;

            .el-dialog__title {
                color: #fff;
            }
        }

        .el-dialog__body {
            padding: 20px;
        }
    }
</style>
