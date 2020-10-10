/**
 * @description student-档案管理接口
 * */

import request from "../../utils/request";

/**
 * @description 新建档案
 * @param data {Object} 档案数据，创建的时候需传入相关用户的_id
 * */
export function addArchive(data) {
	return request({
		url: '/general/archives',
		method: 'post',
		data,
	})
}

/**
 * @description 获取档案
 * */
export function getArchive() {
	return request({
		url: '/general/archives',
		method: 'get'
	})
}