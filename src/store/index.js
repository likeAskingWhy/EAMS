import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import sidebar from "./modules/sidebar"
import breadcrumb from "./modules/breadcrumb"
import tabs from "./modules/tabs"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sidebar,
    breadcrumb,
    tabs
  },
  getters
})
