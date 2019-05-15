import Vue from "vue";
import Router from "vue-router";
import PoststList from './components/PostsList';
import PostCreate from './components/PostCreate';
import PostView from './components/PostView';
import Error404 from './components/Error404';

Vue.use(Router);

const routes = [
    {
        name: 'main',
        path: '',
        component: PoststList,
    },
    {
        path: '/posts/add',
        component: PostCreate
    },
    {
        path: '/posts/edit/:id',
        component: PostCreate
    },
    {
        path: '/posts/:id',
        component: PostView
    },
    {
        path: '*',
        component: Error404
    }
];


export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
