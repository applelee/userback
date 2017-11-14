import http from '@/utils/http';

export default {
  namespaced: true,
  actions: {
    // 同步操作
    register(context, data) {
      return http.post('/auth/signup', data);
    },
  },
};
