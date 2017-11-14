import http from '@/utils/http';

export default {
  namespaced: true,
  actions: {
    // 同步操作
    login(context, data) {
      return http.post('/auth/signin', data);
    },
  },
};
