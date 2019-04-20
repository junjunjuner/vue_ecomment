// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
//
// Vue.config.productionTip = false
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index';
import VueRouter from 'vue-router';

import Axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = 'api';

Vue.use(ElementUI);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
