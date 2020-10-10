import request from "../../utils/request"

/** user 用户管理接口 */

/**
 * @description 查询
 * @param query {object} 查询条件
 * */
export function searchUser(query) {
	return request({
		url: '/system/search_user',
		method: 'post',
		data: query
	})
}

/**
 * @description 添加用户
 * @param data {Object}
 * */
export function addUser(data) {
	return request({
		url: '/general/users',
		method: 'post',
		data,
	})
}

/**
 * @description 获取用户
 * */
export function getUser() {
	return request({
		url: '/general/users',
		method: 'get',
	})
}

/**
 * @description 获取指定用户
 * @param id {String} 用户id
 * */
export function getUserDetail(id) {
	return request({
		url: '/general/users' + '/' + id,
		method: 'get',
	})
}

/**
 * @description 修改用户
 * @param id {String} 用户id
 * @param data {Object} 修改的数据
 * */
export function editUser(id, data) {
	return request({
		url: '/general/users' + '/' + id,
		method: 'put',
		data,
	})
}

/**
 * @description 删除指定用户
 * @param id {String} 用户id
 * */
export function deleteUser(id) {
	return request({
		url: '/general/users' + '/' + id,
		method: 'delete',
	})
}