import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: true,
        user: Object,
    },
    mutations: {
        updateUserFB(state) {
            state.user = firebase.auth().currentUser
        },
        toggleLoading(state) {
            if (state.loading == false) {
                state.loading = true
            } else {
                state.loading = false
            }
        },
    },
})
