import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/token'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) next()
            else {
                try {
                    const {roles} = await store.dispatch('GetInfo')
                } catch (error) {

                }
            }
        }
    }
})