import request from "../../utils/request"

/** user 用户管理接口 */

/** 用户管理公共url */
const url = '/common/users'

/**
 * @description 获取用户列表
 * */
export function getUserList() {
	return request({
		url,
		method: 'get'
	})
}

/**
 * @description 获取详情用户
 * @param id {string} 用户id
 * */
export function getUserDetail(id) {
	return request({
		url,
		method: 'get',
		params: id
	})
}

/**
 * @description 添加用户
 * */
export function addUser(data) {
	return request({
		url,
		method: 'post',
		data,
	})
}

/**
 * @description 修改用户
 * @param id {string} 用户id
 * @param data {object} 要提交的数据
 * */
export function editUser(id, data) {
	return request({
		url,
		method: 'put',
		params: id,
		data,
	})
}

/**
 * @description 删除用户
 * @param id {string} 用户id
 * */
export function editUser(id) {
	return request({
		url: `${url}/${id}`,
		method: 'delete'
	})
}

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