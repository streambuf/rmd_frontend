import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";
import { store } from "./store";
import Bulma from "bulma";
import Bulmajs from "@vizuaalog/bulmajs"

import Editor from "vue-editor-js";
import vueHeadful from 'vue-headful';
import appstyles from "./assets/app-style.css";

import moment from 'moment';
Vue.prototype.moment = moment;
moment.locale('ru');

import { library } from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Editor);
Vue.use(VueResource);
Vue.http.options.root = process.env.VUE_APP_HOST;
Vue.component('vue-headful', vueHeadful);

let jsonUserFromStorage = localStorage.getItem('user');
if (!!jsonUserFromStorage) {
  let userFromStorage = JSON.parse(jsonUserFromStorage);
  Vue.http.headers.common["Authorization"] = "Bearer " + userFromStorage.authToken;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
