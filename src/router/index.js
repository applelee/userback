import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Register from '@/components/pages/Register';
import Release from '@/components/pages/Release';

Vue.use(Router);

export default new Router({
  mode: 'history',        /* 路由类型设定 */
  routes: [
    // 首页重定向
    {
      path: '/',
      redirect: '/login',
    },
    // 登录页组件
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    // 注册页组件
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    // 发布页组件
    {
      path: '/release',
      name: 'Release',
      component: Release,
    },
  ],
});
