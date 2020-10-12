<template>
    <div class="user-container">
        <div class="tree-box">
            <el-input
                    type="text"
                    v-model="filterText"
                    placeholder="请输入部门名称"
                    size="small"
                    clearable
                    prefix-icon="el-icon-search">
            </el-input>
            <common-card>
                <div class="tree-node-info">
                    <div><span class="depart-label">部门编号：</span><span>{{currentNode.id || '- - -'}}</span></div>
                    <div><span class="depart-label">部门名称：</span><span>{{currentNode.label || '- - -'}}</span></div>
                </div>
            </common-card>
            <el-tree
                    :data="treeData"
                    ref="departTree"
                    :props="treeProps"
                    highlight-current
                    node-key="id"
                    @current-change="getCurrentNodeInfo"
                    :default-expanded-keys="[10]"
                    :filter-node-method="filterNode"
                    accordion>
            </el-tree>
        </div>
        <div class="form-box" ref="formBox">
            <common-card>
                <el-form class="search-menu" label-width="100px">
                    <el-form-item label="用户名称：">
                        <el-input type="text" size="small" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input type="text" size="small" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：">
                        <el-input type="text" size="small" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期：">
                        <el-input type="text" size="small" placeholder="请输入创建日期"></el-input>
                    </el-form-item>
                </el-form>
                <div class="crud-menu">
                    <el-button
                            type="success"
                            icon="el-icon-plus"
                            size="small"
                            @click="dialogAddOpen"
                    >新增</el-button>
                    <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="small"
                            @click="deleteUsers"
                            :disabled="multipleSelection.length === 0? true : false"
                    >删除</el-button>
                    <el-button
                            type="warning"
                            icon="el-icon-upload2"
                            size="small"
                    >导入</el-button>
                    <el-button
                            type="default"
                            icon="el-icon-download"
                            size="small"
                            @click="exportData"
                    >导出</el-button>
                    <el-button
                            type="warning"
                            plain
                            icon="el-icon-refresh"
                            size="small"
                            style="float: right"
                    >重置
                    </el-button>
                    <el-button
                            type="primary"
                            plain
                            icon="el-icon-search"
                            size="small"
                            style="float: right"
                    >搜索
                    </el-button>
                </div>
            </common-card>
            <table-pagination
                    :table-config="tableConfig"
                    :pagination-config="paginationConfig"
                    @handleSelectionChange="handleSelectionChange"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
                <template v-slot:createdAt="slot">{{slot.scope.row.createdAt | formatDate('YYYY-MM-DD HH:mm:ss')}}</template>
                <template v-slot:operation="slot">
                    <el-button
                            type="text"
                            @click="dialogEditOpen(slot.scope.row)"
                    >编辑</el-button>
                    <el-button
                            type="text"
                            @click="getDetailInfo(slot.scope.row)"
                    >详情</el-button>
                </template>
                <template v-slot:status="slot">
                    <el-switch
                            v-model="slot.scope.row.status"
                            active-color="#13ce66"
                            active-value="able"
                            inactive-value="disable"
                    ></el-switch>
                </template>
            </table-pagination>
        </div>
        <user-form
                :form="userDate"
                :dialog-visible="dialogConfig.dialogVisible"
                :dialog-title="dialogConfig.dialogTitle"
                dialog-width="45%"
                @dialogCancel="dialogCancel"
                @dialogEnsure="dialogEnsure">
        </user-form>
    </div>
</template>

<script>
	import {user_tree_data} from "../../resource/tree"
	import {user_columns} from "../../resource/columns"
	import {exportToExcelFile} from "../../utils/tools"
	import TablePagination from "../../components/table/TablePagination"
	import CommonCard from "../../components/card/CommonCard"
	import UserForm from "./components/UserForm";
	import CommonDialog from "../../components/dialog/CommonDialog";
	import dayjs from 'dayjs'
	import {
		addUser,
        getUser,
        getUserDetail,
        deleteUser,
        editUser,
        searchUser
	} from "../../api/system/user"
    import {addArchive} from "../../api/student/archive"

	export default {
		name: "User",
		components: {CommonDialog, CommonCard, TablePagination, UserForm},
        filters: {
		    formatDate(date, partten) {
		    	return dayjs(date).format(partten)
            },
        },
		data() {
			return {
				/** tree配置 */
				treeData: [],
				currentNode: {},
				filterText: '',
				treeProps: {
					label: data => {
						return `[${data.id}] ` + data.label
					}
				},
                /** dialog配置 */
                dialogConfig: {
	                dialogVisible: false,
	                dialogTitle: '',
                },
                /** table配置 */
				tableConfig: {
					tableData: [],
					columns: [],            // 传入子组件的column配置
				},
				userDate: {},               // 表格的某一行数据
				multipleSelection: [],      // 存入表格选中的每一行数据
				/** 分页配置 */
				paginationConfig: {
					currentPage: 1,
					pageSizes: [10, 20, 50, 100, 1000],
					pageSize: 10
				},
			}
		},
		watch: {
			filterText(val) {
				this.$refs.departTree.filter(val);
			},
		},
		methods: {
			/** 分页组件中每页显示的数据变化时调用 */
			handleSizeChange(val) {
				this.paginationConfig.pageSize = val
			},
			/** 分页组件中当前页码变化时调用 */
			handleCurrentChange(val) {
				this.paginationConfig.currentPage = val
			},
            /** 获取用户列表 */
            getUserList() {
                getUser().then(res => {
                	this.tableConfig.tableData = res.data
                })
            },
			/** 查看详情信息 */
			getDetailInfo(row) {
				console.log(row);
			},
			/** 将数据导出为Excel文件 */
			exportData() {
				exportToExcelFile(document.querySelector('.el-table'))
			},
			/** 获取当前选择节点的数据 */
			getCurrentNodeInfo(data, node) {
				this.currentNode = data
				this.currentNode.parentLabel = node.parent.data.label
				this.currentNode.parentId = node.parent.data.id
			},
			/** 过滤节点 */
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
            /** 点击新增打开对话框 */
			dialogAddOpen() {
				this.userDate = {}
				this.dialogConfig.dialogTitle = '新增用户'
			    this.dialogConfig.dialogVisible = true
            },
            /** 点击编辑打开对话框 */
            dialogEditOpen(row) {
	            this.userDate = row
                this.dialogConfig.dialogTitle = '编辑用户'
                this.dialogConfig.dialogVisible = true
            },
            /** 取消按钮关闭对话框 */
            dialogCancel() {
				this.dialogConfig.dialogVisible = false
            },
            /** 对话框确认按钮 */
            dialogEnsure(data) {
            	if (this.dialogConfig.dialogTitle === '新增用户') {
		            addUser(data).then(res => {
			            console.log(res);
			            this.$message.success('新用户添加成功。')
			            this.getUserList()
                        addArchive({u_id: res.data.model._id}).then(resp => {
                        	this.$message.success('已为您创建好了档案，请前去完善！')
                        })
		            })
                } else if (this.dialogConfig.dialogTitle === '编辑用户') {
            		editUser(data._id, data).then(res => {
			            this.$message.success('用户信息修改成功。')
			            this.getUserList()
                    })
                }
	            this.dialogConfig.dialogVisible = false
            },
            /** 获取选中表格的行数据 */
			handleSelectionChange(val) {
				this.multipleSelection = val
            },
            /** 删除用户 */
			deleteUsers() {
				if (this.multipleSelection && this.multipleSelection.length > 0) {
					this.$confirm('此操作将删除选中的用户, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						this.multipleSelection.forEach(row => {
							deleteUser(row._id).then(res => {
                                this.getUserList()
							})
						})
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
                }
            }
		},
		created() {
			this.getUserList()
			this.treeData = user_tree_data                          // 获取表格数据
			this.tableConfig.columns = user_columns                 // 获取表格配置
		}
	}
</script>

<style scoped lang="scss">
    .user-container {
        display: flex;
        justify-content: space-between;
        height: calc(100vh - 160px);
        overflow: auto;

        .tree-box {
            margin-right: 20px;
            flex: 0.35;
            min-width: 230px;
            overflow: auto;

            .tree-node-info {
                font-size: 14px;
                color: #606266;

                div {
                    padding: 3px;
                    display: flex;
                    justify-content: space-between;

                    .depart-label {
                        color: #8c939d;
                    }
                }
            }

            .el-input {
                margin-bottom: 15px;
            }
        }

        .form-box {
            flex: 2;
            overflow: auto;

            .search-menu {
                display: flex;

                .el-form-item {
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>