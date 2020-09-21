<template>
    <div class="user-container">
        <div class="tree-box">
            <el-input
                    type="text"
                    v-model="queryInfo"
                    placeholder="请输入部门名称"
                    size="small"
                    prefix-icon="el-icon-search">
            </el-input>
            <el-tree
                    :data="treeData"
                    :props="treeProps"
                    highlight-current
                    node-key="id"
                    :default-expanded-keys="[10]"
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
                    <el-button type="success" icon="el-icon-plus" size="small">新增</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button type="danger" disabled icon="el-icon-delete" size="small">删除</el-button>
                    <el-button type="warning" icon="el-icon-upload2" size="small">导入</el-button>
                    <el-button type="default" icon="el-icon-download" size="small" @click="exportData">导出</el-button>
                    <el-button type="warning" plain icon="el-icon-refresh" size="small" style="float: right">重置</el-button>
                    <el-button type="primary" plain icon="el-icon-search" size="small" style="float: right">搜索</el-button>
                </div>
            </common-card>
            <table-pagination
                    :table-config="tableConfig"
                    :pagination-config="paginationConfig"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
                <template v-slot:createDate="slot">{{slot.scope.row.createdAt}}</template>
                <template v-slot:operation="slot">
                    <el-button type="default" size="small" @click="getDetailInfo(slot.scope.row)">详情</el-button>
                </template>
            </table-pagination>
        </div>
    </div>
</template>

<script>
    import {user_tree_data} from "../../resource/tree"
    import {user_columns} from "../../resource/columns"
    import TablePagination from "../../components/table/TablePagination"
    import CommonCard from "../../components/card/CommonCard"
    import {exportToExcelFile} from "../../utils/tools"

    export default {
		name: "User",
	    components: {CommonCard, TablePagination},
	    data() {
			return {
				queryInfo: '',
                treeData: [],
				treeProps: {
                    label: data => {
                    	return `[${data.id}] ` + data.label
                    }
                },
                tableConfig: {
					tableData: [
                        {_id: '20200919000101', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000102', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000103', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000104', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000105', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000106', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000107', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000108', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000109', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000110', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000111', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000112', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000113', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000114', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000115', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000116', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000117', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000118', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000119', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000120', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000121', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000122', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000123', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
						{_id: '20200919000124', adminname: 'zhangxiaozhang', owner: '张均浩', createdAt: '2020-09-19'},
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