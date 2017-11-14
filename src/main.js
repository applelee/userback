import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from '@/utils/VueUse';
import App from '@/components/App';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
