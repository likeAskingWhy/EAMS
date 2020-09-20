<template>
    <div class="table-pagination">
        <!-- 公共表格+分页组件 -->
        <el-table
                :data="sliceTableData"
                show-overflow-tooltip
                height="528"
                stripe
                :header-cell-style="{background: '#F8F8F9', color: '#666'}">
            <template v-for="column in tableConfig.columns">
                <el-table-column
                        v-if="column.slot"
                        :label="column.label"
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
                hide-on-single-page
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
            }
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