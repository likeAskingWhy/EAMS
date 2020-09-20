<template>
    <el-table
            :data="tableConfig.tableData"
            show-overflow-tooltip
            stripe
            height="528"
            :header-cell-style="{background: '#F0F7FF', color: '#999'}">
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
</template>

<script>
	export default {
		name: "EamsTable",
		props: {
			tableConfig: {
				tableData: {
					type: Array,
					default() {
						return []
					}
				},
				columns: {
					type: Array,
					default() {
						return []
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">

</style>