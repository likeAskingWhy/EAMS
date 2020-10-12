/**
 * @description system_user_columns
 * */
export const user_columns = [
	{prop: 'username', label: '用户名'},
	{prop: 'name', label: '真实姓名'},
	{prop: 'department', label: '所属部门'},
	{prop: 'phone', label: '手机号'},
	{prop: 'status', label: '账号状态', slot: 'status'},
	{prop: 'createdAt', label: '创建日期', slot: 'createdAt'},
	{label: '操作', slot: 'operation'}
]