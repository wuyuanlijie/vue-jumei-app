import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getter from './getter.js'
import cart from './mudules/cart'

Vue.use(Vuex)

// 存放着组件中信息的状态
const state = {
  navState: 0,  //获取导航条的状态
  activityList: [],
  goodsList: [],
  tabHidden: true,
  productInfo: {},
  selectTab: '首页'
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getter,
  modules: {
    cart
  }
})
