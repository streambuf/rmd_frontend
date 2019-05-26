import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    user: getUserFromLocalStorage()
  },
  getters: {
    isAuthenticated: state => !!state.user,
    isAdmin: (state, getters) => getters.isAuthenticated && state.user.privileges.includes('ADMIN'),
    getCurrentUser: state => state.user,
    getCurrentLogin: (state, getters) => {
      return getters.isAuthenticated ? state.user.login : ''
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      Vue.http.headers.common["Authorization"] = "Bearer " + data.authToken;
      localStorage.setItem('user', JSON.stringify(data));
    },
    removeUser(state) {
      localStorage.removeItem('user');
      state.user = '';
      Vue.http.headers.common["Authorization"] = '';
    }
  },
  actions: {
    setUser(store, data) {
      store.commit("setUser", data);
    },
    removeUser(store) {
      store.commit("removeUser")
    }
  }
};

function getUserFromLocalStorage() {
  let user = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  } else {
    return '';
  }
}
