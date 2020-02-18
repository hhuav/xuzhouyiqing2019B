// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import Qs from 'qs'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.prototype.$echarts = echarts
Vue.use(ViewUI);
Vue.config.productionTip = false
// 设置基础URL
const axios_instance = axios.create({
  //config里面有这个transformRquest，这个选项会在发送参数前进行处理。
  //这时候我们通过Qs.stringify转换为表单查询参数
  
  //测试地址
  baseURL: 'http://localhost:9166/SXZYQ/',
  timeout: 60000,
  transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
  }],
  //设置Content-Type
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  validateStatus: function (status) {
    return status; // 默认的
  },
});
Vue.prototype.$axios = axios_instance;
Vue.prototype.$qs = Qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
