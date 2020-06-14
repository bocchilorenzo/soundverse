import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: Object,
        username: Object
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
                .then(function (querySnapshot) {
                    usr = querySnapshot.data().username
                    state.username = usr
                })
                .catch(function (error) {
                    console.log('Error getting document:', error)
                })
        },
        updateUsernameClearFB(state) {
            state.username = null
        }
    },
})
