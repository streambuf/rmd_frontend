import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";
import locations from "./modules/locations";

export const store = new Vuex.Store({
  modules: {
    user,
    locations
  },
  strict: process.env.NODE_ENV !== "production"
});
