/**
 * @description login-登录接口
 * */

import request from "@/utils/request";

/**
 * @description 登录系统
 * @param data {Object} 用户名和密码对象
 * */
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data,
    })
}