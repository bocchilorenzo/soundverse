import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import albumInformation from '../views/albumView.vue'
import search from '../views/searchView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/album/:id',
        name: 'album',
        component: albumInformation,
    },
    {
        path: '/search/:q',
        name: 'search',
        component: search,
    },
]

const router = new VueRouter({
    routes,
})

export default router
