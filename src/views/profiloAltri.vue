<template>
    <div>
        <p>{{ username }}</p>
        <p>{{ email }}</p>
        <p>followers: {{ followers[0].num[0] }}</p>
        <p>following: {{ following[0].num[0] }}</p>
        <div class="my-2">
            <v-btn v-if="!segui[0]" color="primary">Segui</v-btn>
            <v-btn color="primary" v-else>Non seguire più</v-btn>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'profiloAltri',
    data() {
        return {
            user: this.$store.state.user,
            username: this.$route.params.username,
            email: this.$route.params.email,
            following: [{ num: [0], users: [] }],
            followers: [{ num: [0], users: [] }],
            segui: [false],
        }
    },
    created() {
        var db = firebase.firestore()
        var mail = this.email
        var userData = db.collection('utenti').doc(mail)
        var check = this.checkInfo()
        userData
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    console.log('trovato')
                    check
                } else {
                    console.log('utente inesistente')
                }
            })
            .catch(function(error) {
                console.log('Error getting document:', error)
            })
    },
    methods: {
        checkInfo() {
            var db = firebase.firestore()
            var mail = this.email
            var segui = this.segui

            var userData1 = db
                .collection('utenti')
                .doc(mail)
                .collection('followers')
            var userData2 = db
                .collection('utenti')
                .doc(mail)
                .collection('following')

            var userData3 = db
                .collection('utenti')
                .doc(this.user.email)
                .collection('following')

            var followers = this.followers
            var following = this.following

            userData1
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no followers')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var follower = {
                                email: doc.id,
                            }
                            followers[0].users.push(follower)
                            followers[0].num[0] += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            userData2
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no following')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var followin = {
                                email: doc.id,
                            }
                            following[0].users.push(followin)
                            following[0].num[0] += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
            console.log(this.user.email)
            console.log(mail)
            userData3
                .doc(mail)
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        segui[0] = true
                        console.log('lo segui')
                    } else {
                        segui[0] = false
                        console.log('non lo segui')
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        },
    },
}
</script>

<style></style>
