export default {
  namespaced: true,
  state: {
    name: 'Max Fax'
  },
  getters: {
    getName(state){
      return state.name;
    },
  },
  mutations: {
    setName(state, name){
      state.nabla = name;
    }
  },
  actions: {
    setName(store, name){
      store.commit('set', name);
    }
  }
};
