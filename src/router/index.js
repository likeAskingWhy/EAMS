import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../layout/Layout"
import Empty from "../layout/Empty"
import {getToken} from "@/utils/token";

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: '登录界面'
    }
  },
  {
    path: '/',
    name: 'Index',
    component: 'Layout',
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/Index'),
        meta: {
          title: '系统首页'
        },
      }
    ]
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '/system',
        component: Empty,
        children: [
          {path: '/user', name: 'Name', component: () => import('../views/system/User'), meta: {title: '用户管理', role: ['admin']}},
          {path: '/role', name: 'Role', component: () => import('../views/system/Role'), meta: {title: '角色管理', role: ['admin']}}
        ]
      },
      {
        path: '/student',
        component: Empty,
        children: [
          {path: '/school-roll', name: 'SchoolRoll', component: () => import('../views/student/SchoolRoll'), meta: {title: '学籍管理', role: ['teacher', 'admin']}},
          {path: '/archive', name: 'Archive', component: () => import('../views/student/Archive'), meta: {title: '档案管理', role: ['teacher', 'admin']}},
          {path: '/edit-archive/:id', name: 'EditArchive', component: () => import('../views/student/EditArchive'), meta: {title: '编辑档案', role: ['teacher', 'admin']}}
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (getToken()) next()
  else {
    if (to.path == '/login') next()
    else next('/login')
  }
})

export default router
