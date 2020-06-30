import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
    apiKey: 'AIzaSyD5-2o8KQaQd0d24OZU9_y15i1JQh5Rutk',
    authDomain: 'deezerate.firebaseapp.com',
    databaseURL: 'https://deezerate.firebaseio.com',
    projectId: 'deezerate',
    storageBucket: 'deezerate.appspot.com',
    messagingSenderId: '308802978101',
    appId: '1:308802978101:web:201fbda81a988916738c7c',
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
