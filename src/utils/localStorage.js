import conf from '@/config';
import utils from '@/utils';

// 获取全局localStorage
const localStorage = window.localStorage;

// 存取localStorage上的值
export default {
  install: (vm) => {
    const Vue = vm;
    const appName = conf.appName;

    Vue.prototype.$saveLS = (key, value) => {
      if (!utils.isJSON(localStorage.getItem(appName))) {
        // 初始化
        localStorage.setItem(appName, JSON.stringify({
          username: '',
          password: '',
          remember: false,
          accessToken: '',
        }));
      }

      let newValue = value;
      let obj = {};

      if (typeof newValue === 'object') {
        newValue = JSON.stringify(newValue);
      }

      obj = JSON.parse(localStorage.getItem(appName));
      obj[key] = newValue;
      localStorage.setItem(appName, JSON.stringify(obj));
    };

    Vue.prototype.$getLS = (key) => {
      if (!utils.isJSON(localStorage.getItem(appName))) {
        // 初始化
        localStorage.setItem(appName, JSON.stringify({
          username: '',
          password: '',
          remember: false,
          accessToken: '',
        }));
      }

      const obj = JSON.parse(localStorage.getItem(appName));
      return obj[key];
    };
  },
};
