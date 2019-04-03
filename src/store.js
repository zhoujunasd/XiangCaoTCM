// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    userTokenInfo: {}, //用户登录的token信息
    helpInfoList: [], //html数据
    newsList: [], //新闻页面html数据
    htmlData: '',//从新闻列表页面进去的数据
  },
  mutations: {
    increment: (state, value) => {
      state.count += value
    },
    // increment: (state) => {
    //   const obj = state
    //   obj.count += 1
    // },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    GET_TOKEN_INFO: (state, value) => {
      state.userTokenInfo = value; 
    },
    GET_HELP_INFO_LIST:(state, value) => {
      state.helpInfoList = value; 
    },
    GET_NEWS_INFO:(state, value) => {
      state.newsList = value
    },
    GET_NEWS_LIST:(state, value) => {
      state.htmlData = value
    }
  },
  // 计算属性，可以过滤计算store的值
  getters: {
    getterTest: state => {
        const obj = state
        return obj.count += 6
    }
  },
  //   实现异步操作
  actions: {
    act(context) {
      context.commit('decrement')
    },
  },
  //    状态持久化
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {}
      }
    })
  ]
})

export default store
