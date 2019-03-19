import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 导入及使用mpvue-router
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)

// 导入store
import store from './store'
Vue.prototype.$store = store;

// 导入封装的net，数据请求
import { net } from './utils/net'
Vue.prototype.$net = net

const app = new Vue(App)
app.$mount()

// created 钩子有bug，所有页面的created函数会在项目加载时，一起被调用，
// 使用onLoad钩子代替
// 从页面B返回页面A，页面的mounted不会被触发，页面没有被重载，
// 每次页面加载时都需要的展示，使用onshow代替
