import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: Object,
        username: localStorage.getItem('username'),
    },
    mutations: {
        updateUserFB(state) {
            state.user = firebase.auth().currentUser
        },
        updateUsernameSetFB(state) {
            var db = firebase.firestore()
            var email = state.user.email
            var userData = db.collection('utenti').doc(email)
            var usr = ''
            userData
                .get()
                .then(function(querySnapshot) {
                    usr = querySnapshot.data().username
                    localStorage.setItem('username', usr)
                    state.username = localStorage.getItem('username')
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        },
        updateUsernameClearFB(state) {
            state.username = null
            localStorage.removeItem('username')
        },
    },
})
