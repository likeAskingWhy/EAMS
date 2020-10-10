import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../layout/Layout"
import Empty from "../layout/Empty"

Vue.use(VueRouter)

const routes = [
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
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '/system',
        component: Empty,
        children: [
          {path: '/user', name: 'Name', component: () => import('../views/system/User'), meta: {title: '用户管理'}},
          {path: '/role', name: 'Role', component: () => import('../views/system/Role'), meta: {title: '角色管理'}}
        ]
      },
      {
        path: '/student',
        component: Empty,
        children: [
          {path: '/school-roll', name: 'SchoolRoll', component: () => import('../views/student/SchoolRoll'), meta: {title: '学籍管理'}},
          {path: '/archive', name: 'Archive', component: () => import('../views/student/Archive'), meta: {title: '档案管理'}},
          {path: '/edit-archive/:id', name: 'EditArchive', component: () => import('../views/student/EditArchive'), meta: {title: '编辑档案'}}
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
