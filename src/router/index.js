import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/',
    },
    {
	    path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
	},
    {
        path: '/album/:id',
        name: 'album',
		component: () => import(/* webpackChunkName: "album" */ '../views/albumView.vue')
    },
    {
        path: '/search/:q',
        name: 'search',
		component: () => import(/* webpackChunkName: "search" */ '../views/searchView.vue')
    },
    {
        path: '/login',
        name: 'login',
		component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
		component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
        path: '/user/:username',
        name: 'user',
		component: () => import(/* webpackChunkName: "otherUser" */ '../views/profiloAltri.vue')
    },
    {
        path: '/profile',
        name: 'profile',
		component: () => import(/* webpackChunkName: "profile" */ '../views/profile.vue')
    },
    {
        path: '/list/:type/:lista',
        name: 'list',
		component: () => import(/* webpackChunkName: "list" */ '../views/listView.vue')
    },
    {
        path: '/artist/:artista',
        name: 'artist',
		component: () => import(/* webpackChunkName: "artist" */ '../views/artistView.vue')
    },
    {
        path: '/ascoltati',
        name: 'ascoltati',
		component: () => import(/* webpackChunkName: "userAlbums" */ '../views/albumUtente.vue')
    },
    {
        path: '/daAscoltare',
        name: 'daAscoltare',
		component: () => import(/* webpackChunkName: "userAlbums" */ '../views/albumUtente.vue')
    },
    {
        path: '/preferiti',
        name: 'preferiti',
		component: () => import(/* webpackChunkName: "userAlbums" */ '../views/albumUtente.vue')
    },
    {
        path: '/generi',
        name: 'generi',
		component: () => import(/* webpackChunkName: "generi" */ '../views/generi.vue')
    },
    {
        path: '/genere/:id',
        name: 'genere',
		component: () => import(/* webpackChunkName: "genere" */ '../views/genere.vue')
    },
    {
        path: '/impostazioni',
        name: 'impostazioni',
		component: () => import(/* webpackChunkName: "impostazioni" */ '../views/impostazioni.vue')
    },
]

const router = new VueRouter({
    routes,
})

export default router
