import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import albumInformation from '../views/albumView.vue'
import search from '../views/searchView.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import profile from '../views/profile.vue'
import listView from '../views/listView.vue'
import artistView from '../views/artistView.vue'
import ascoltati from '../views/ascoltati.vue'
import daAscoltare from '../views/daAscoltare.vue'
import preferiti from '../views/preferiti.vue'
import profiloAltri from '../views/profiloAltri'
import generi from '../views/generi'
import genere from '../views/genere'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/',
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
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
    },
    {
        path: '/user/:username',
        name: 'user',
        component: profiloAltri,
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
    },
    {
        path: '/list/:type/:lista',
        name: 'list',
        component: listView,
    },
    {
        path: '/artist/:artista',
        name: 'artist',
        component: artistView,
    },
    {
        path: '/ascoltati',
        name: 'ascoltati',
        component: ascoltati,
    },
    {
        path: '/daAscoltare',
        name: 'daAscoltare',
        component: daAscoltare,
    },
    {
        path: '/preferiti',
        name: 'preferiti',
        component: preferiti,
    },
    {
        path: '/generi',
        name: 'generi',
        component: generi,
    },
    {
        path: '/genere/:id',
        name: 'genere',
        component: genere,
    },
]

const router = new VueRouter({
    routes,
})

export default router
