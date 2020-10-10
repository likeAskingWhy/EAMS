<template>
    <div class="archive-container">
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
        </common-card>
        <div class="layout-container">
            <div class="archive-list">
                <table-pagination
                        :table-config="tableConfig"
                        :pagination-config="paginationConfig">

                </table-pagination>
            </div>
            <div class="archive-detail"></div>
        </div>
    </div>
</template>

<script>
	import CommonCard from "../../components/card/CommonCard"
	import TablePagination from "../../components/table/TablePagination"
    import {getArchive} from "../../api/student/archive"
    import {user_columns} from "../../resource/columns"

	export default {
		name: "Archive",
		components: {TablePagination, CommonCard},
        data() {
			return {
				/** 表格配置 */
                tableConfig: {
					tableData: [],
                    columns: []
                },
				/** 分页配置 */
				paginationConfig: {
					currentPage: 1,
					pageSizes: [10, 20, 50, 100],
					pageSize: 10
				},
            }
        },
		methods: {
			exportData() {
				console.log('daochudangan')
			},
            getArchiveList() {
				getArchive().then(res => {
					this.tableConfig.tableData = res.data
                })
            }
		},
        created() {
			this.tableConfig.columns = user_columns
			this.getArchiveList()
        }
	}
</script>

<style scoped lang="scss">
    .archive-container {
        height: calc(100vh - 160px);
        .search-menu {
            display: flex;
            .el-form-item {
                margin-bottom: 0px;
            }
        }
        .layout-container {
            display: flex;
            justify-content: space-between;
            height: calc(100% - 92px);
            .archive-list {
                flex: 6;
                margin-right: 20px;
            }
            .archive-detail {
                flex: 2;
                border: 1px solid #dddddd;
            }
        }
    }
</style>