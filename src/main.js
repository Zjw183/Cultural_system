import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { getToken } from './utils/localStorage'
Vue.config.productionTip = true
Vue.use(ElementUI);
 //后面通过this.qs调用

const devL = "http://127.0.0.1:8022" //本地测试1.116.165.56
const devLiJun = "http://192.168.1.101:8022"
const devLD = "http://192.168.43.48:8022"
const devtcz = "http://192.168.1.101:8022"
const redirect = "http://www.suquhong.cn/api"
const devSYuHing = 'http://sqh.gnnu.edu.cn/api'

// 引入axios
import axios from 'axios'
//为了统一所有页面所用到的Url
const trueUrl = devSYuHing


  // const trueUrl=devL

window.trueUrl = trueUrl
axios.defaults.baseURL = trueUrl
axios.defaults.withCredentials = false; //配置为true
Vue.prototype.$axios = axios

if (sessionStorage.getItem("store")) {
  store.replaceState(
    Object.assign(
      {},
      store.state,
      JSON.parse(sessionStorage.getItem("store"))
    )
  );
  sessionStorage.removeItem("store")
}
//监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});

// 请求拦截器
axios.interceptors.request.use((req) => {
  // console.log(req,'请求'); || req.url != '/home'
  if (req.url != '/login') {
    // 不是登录就要添加请求头，附加上token
    req.headers.authorization = getToken();
  }
  return req;

});

// 响应拦截器
axios.interceptors.response.use((res) => {
  // 全局拦截错误，未通过过滤器
  if (res.data.code == '401') {
    Message({
      type: 'error',
      center: true,
      message: '请重新登录!'
    })
    // 跳转到登录页
    router.push('/login')
  }
  return res;
});
import store from '../src/store/store';
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// 导入组件库
import ElementUI from 'element-ui';
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
// 配置 Vue 插件


