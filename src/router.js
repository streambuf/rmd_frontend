import Vue from "vue";
import Router from "vue-router";
import PoststList from './components/PostsList';
import AddPost from './components/AddPost';
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
        component: AddPost
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
