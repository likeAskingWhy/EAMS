<template>
    <div class="table-pagination">
        <!-- 公共表格+分页组件 -->
        <el-table
                :data="sliceTableData"
                show-overflow-tooltip
                ref="multipleTable"
                height="528"
                @selection-change="handleSelectionChange"
                :header-cell-style="{background: '#409EFF', color: '#fff'}">
            <el-table-column
                    type="selection"
                    align="center"
                    width="55">
            </el-table-column>
            <el-table-column
                    type="index"
                    align="center"
                    label="用户编号"
                    width="100">
            </el-table-column>
            <template v-for="column in tableConfig.columns">
                <el-table-column
                        v-if="column.slot"
                        :label="column.label"
                        align="center"
                        :prop="column.prop"
                        :key="column.prop">
                    <template slot-scope="scope">
                        <slot
                            :scope="scope"
                            :name="column.slot"
                        ></slot>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else
                        align="center"
                        :label="column.label"
                        :prop="column.prop"
                        :key="column.prop"
                ></el-table-column>
            </template>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationConfig.currentPage"
                :page-sizes="paginationConfig.pageSizes"
                prev-text="上一页"
                next-text="下一页"
                background
                :page-size="paginationConfig.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableConfig.tableData.length">
        </el-pagination>
    </div>
</template>

<script>
	export default {
		name: "TablePagination",
		props: {
			/** 表格配置 */
			tableConfig: {
				/** 表格数据 */
				tableData: {
					type: Array,
					default() {
						return []
					}
				},
				/** 表格配置 */
				columns: {
					type: Array,
					default() {
						return []
					}
				},
            },
            /** 分页配置 */
			paginationConfig: {
				/** 当前页 */
				currentPage: {
					type: Number,
					required: true
                },
	            /** 每页显示指定数据的选项 */
	            pageSizes: {
					type: Array,
                    required: true
                },
                /** 每页显示多少条数据 */
	            pageSize: {
	            	type: Number,
	                required: true
                },
            }
		},
        computed: {
	        sliceTableData() {
	            const {currentPage, pageSize} = this.paginationConfig
	            return this.tableConfig.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	        },
        },
        methods: {
			/** 每页显示数据发生变化时触发 */
	        handleSizeChange(val) {
	        	this.$emit('handleSizeChange', val)
            },
            /** 当前页码发生变化时触发 */
	        handleCurrentChange(val) {
	        	this.$emit('handleCurrentChange', val)
            },
            /** 选中表格后触发 */
	        handleSelectionChange(val) {
                this.$emit('handleSelectionChange', val)
            },
        }
	}
</script>

<style scoped lang="scss">
    .table-pagination {
        .el-table {
            margin-bottom: 30px;
        }
        .el-pagination {
            float: right;
        }
    }
</style>