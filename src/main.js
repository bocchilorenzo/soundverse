import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

Vue.config.productionTip = false

const config = {
    apiKey: process.env.VUE_APP_FB_APIKEY,
    authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FB_DBURL,
    projectId: process.env.VUE_APP_FB_PRJID,
    storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FB_MSGID,
    appId: process.env.VUE_APP_FB_APPID,
}

let app = ''

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            vuetify,
            render: h => h(App),
        }).$mount('#app')
    }
})
