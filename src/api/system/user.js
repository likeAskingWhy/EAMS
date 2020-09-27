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