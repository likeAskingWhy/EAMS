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
        <slot></slot>
    </el-dialog>
</template>

<script>
	export default {
		name: "CommonDialog",
        props: {
			dialogTitle: {
				type: String,
                default: '提示'
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
        methods: {
	        dialogCancel() {
		        this.$emit('dialogCancel')
	        },
	        dialogEnsure() {
	        	this.$emit('dialogEnsure')
            }
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
    }
</style>