/**
 * @description system_user_columns
 * */
export const user_columns = [
	{prop: '_id', label: 'ID'},
	{prop: 'adminname', label: '管理员账号'},
	{prop: 'owner', label: '账号持有者'},
	{prop: 'createdAt', label: '创建日期', slot: 'createDate'},
	{label: '操作', slot: 'operation'}
]