import Vue from 'vue';
import Vuex from 'vuex';

import login from '@/store/login';
import register from '@/store/register';
import release from '@/store/release';

// import plugins from './plugins'

Vue.use(Vuex);

export default new Vuex.Store({
  // 严格模式（开启后所有状态必须走mutations）
  strict: process.env.NODE_ENV !== 'production',
  // 根状态（全局状态）
  state: {
    isLogin: false,
  },
  // 状态变更
  mutations: {
    stateLogin(s) {
      const state = s;
      state.isLogin = true;
    },
    stateLogout(s) {
      const state = s;
      state.isLogin = false;
    },
  },
  // plugins,
  plugins: [],
  // modules
  modules: {
    login,
    register,
    release,
  },
});
