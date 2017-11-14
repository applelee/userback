import http from '@/utils/http';

export default {
  namespaced: true,
  state: {
    fCategories: [],
    sCategories: {
      '': [],
    },
  },
  mutations: {
    setFirstCategories(s, data) {
      s.fCategories.push(data);
    },
    setSecondCategories(s, data) {
      const state = s;

      if (typeof state.sCategories[data.parentId] !== 'object') {
        state.sCategories[data.parentId] = [];
      }
      state.sCategories[data.parentId].push(data);
    },
  },
  actions: {
    // 集联
    async categories({ commit }) {
      const result = await http.get('/v1/categories/first/member');
      const data = result.data;
      const len = result.data.length;

      // console.log(data);
      for (let i = 0; i < len; i += 1) {
        if (data[i].parentId === 0) {
          commit('setFirstCategories', data[i]);
        } else {
          commit('setSecondCategories', data[i]);
        }
      }
    },
    storage(context, params) {
      return http.post('/v1/storage', params);
    },
  },
};
