import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: Object,
    },
    mutations: {
        updateUserFB(state) {
            state.user = firebase.auth().currentUser
        },
    },
})
