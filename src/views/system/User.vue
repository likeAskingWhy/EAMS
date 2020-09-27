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
                    <div><span class="depart-label">部门代号：</span><span>{{currentNode.id || '- - -'}}</span></div>
                    <div><span class="depart-label">部门名称：</span><span>{{currentNode.label || '- - -'}}</span></div>
                    <!--                    <div><span class="depart-label">上级部门代号：</span><span>{{currentNode.parentId || '请选择节点'}}</span></div>-->
                    <!--                    <div><span class="depart-label">上级部门：</span><span>{{currentNode.parentLabel || '请选择节点'}}</span></div>-->
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
                <el-form class="search-menu" label-width="80px">
                    <el-form-item label="用户名称">
                        <el-input type="text" size="small" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input type="text" size="small" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态">
                        <el-input type="text" size="small" placeholder="请输入账号状态"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称">
                        <el-input type="text" size="small" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                </el-form>
                <div class="crud-menu">
                    <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新增</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button type="danger" disabled icon="el-icon-delete" size="small">删除</el-button>
                    <el-button type="warning" icon="el-icon-upload2" size="small">导入</el-button>
                    <el-button type="default" icon="el-icon-download" size="small" @click="exportData">导出</el-button>
                    <el-button type="warning" plain icon="el-icon-refresh" size="small" style="float: right">重置
                    </el-button>
                    <el-button type="primary" plain icon="el-icon-search" size="small" style="float: right">搜索
                    </el-button>
                </div>
            </common-card>
            <table-pagination
                    :table-config="tableConfig"
                    :pagination-config="paginationConfig"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
                <template v-slot:createdAt="slot">{{slot.scope.row.createdAt}}</template>
                <template v-slot:operation="slot">
                    <el-button type="text" size="small" @click="getDetailInfo(slot.scope.row)">详情</el-button>
                </template>
            </table-pagination>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <Form></Form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	import {user_tree_data} from "../../resource/tree"
	import {user_columns} from "../../resource/columns"
	import TablePagination from "../../components/table/TablePagination"
	import CommonCard from "../../components/card/CommonCard"
	import {exportToExcelFile} from "../../utils/tools"
	import Form from "./components/user/Form";

	export default {
		name: "User",
		components: {CommonCard, TablePagination, Form},
		data() {
			return {
				treeData: [],
				currentNode: {},
				filterText: '',
				dialogVisible: false,
				treeProps: {
					label: data => {
						return `[${data.id}] ` + data.label
					}
				},
				tableConfig: {
					tableData: [
						{_id: '20200919000101', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000102', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
					],
					columns: [],            // 传入子组件的column配置
				},
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
			}
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
				console.log(data, node);
				this.currentNode = data
				this.currentNode.parentLabel = node.parent.data.label
				this.currentNode.parentId = node.parent.data.id
			},
			/** 过滤节点 */
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			}
		},
		created() {
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