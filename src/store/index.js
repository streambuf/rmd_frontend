import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";
import locations from "./modules/locations";
import postfilters from "./modules/postfilters";

export const store = new Vuex.Store({
  modules: {
    user,
    locations,
    postfilters
  },
  strict: process.env.NODE_ENV !== "production"
});
