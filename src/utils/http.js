import Vue from 'vue';
import axios from 'axios';
// import router from '@/router/index';
import conf from '@/config';

// 创建 axios 实例
const http = axios.create({
  baseURL: conf.baseURL,
  timeout: 5000,
});

// 发送请求拦截处理
http.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const token = Vue.prototype.$getLS('accessToken');
    if (!token) {
      return newConfig;
    }
    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  },
  error => Promise.reject(error),
);

// 返回拦截处理
http.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default http;
