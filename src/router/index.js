import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../layout/Layout"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {path: '/user', name: 'Name', component: () => import('../views/system/User'), meta: {title: '用户管理'}},
      {path: '/role', name: 'Role', component: () => import('../views/system/Role'), meta: {title: '角色管理'}}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
