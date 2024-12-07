import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 导入组件库
import ElementUI from 'element-ui';
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
// 配置 Vue 插件


