import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./store";
import Bulma from "bulma";
import Editor from "vue-editor-js";
import appstyles from './assets/app-style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faComments, faUser, faThumbsUp, faThumbsDown, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faComments, faUser, faThumbsUp, faThumbsDown, faHome);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Editor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
