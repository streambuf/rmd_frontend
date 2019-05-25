import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    user: getUserFromLocalStorage()
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser(state) {
      return state.user;
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
