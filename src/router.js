import Vue from "vue";
import Router from "vue-router";
import PoststList from "./components/PostsList";
import PostCreate from "./components/PostCreate";
import PostView from "./components/PostView";
import Registration from "./components/user/Registration";
import Login from "./components/user/Login";
import Error404 from "./components/Error404";

import { store } from "./store";

const ifAuthenticated = (to, from, next) => {
  if (store.getters['user/isAuthenticated']) {
    next();
    return
  }
  next('/login')
};

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['user/isAuthenticated']) {
    next();
    return
  }
  next('/')
};

Vue.use(Router);

const routes = [
  {
    name: "main",
    path: "",
    component: PoststList
  },
  {
    path: "/posts/add",
    component: PostCreate,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/posts/edit/:id",
    component: PostCreate,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/posts/:id",
    component: PostView
  },
  {
    path: "/registration",
    component: Registration,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "*",
    component: Error404
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
