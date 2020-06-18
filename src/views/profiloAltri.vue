<template>
    <div>
        <p>{{ username.un }}</p>
        <p>{{ email }}</p>
        <p>followers: {{ followers[0].num }}</p>
        <p>following: {{ following[0].num }}</p>
        <div class="my-2" @click="followUnfollow()">
            <v-btn v-if="segui.segui" color="primary">Non seguire più</v-btn>
            <v-btn color="primary" v-else>Segui</v-btn>
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
            username: { un: this.$route.params.username },
            myUsername: this.$store.state.username,
            email: this.$route.params.email,
            following: [{ num: 0, users: [] }],
            followers: [{ num: 0, users: [] }],
            segui: { segui: false },
        }
    },
    created() {
        this.scrollToTop()
        var db = firebase.firestore()
        var mail = this.email
        var userData = db.collection('utenti').doc(mail)
        var check = this.checkInfo()
        //controlla se il profilo esiste
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
        scrollToTop() {
            window.scrollTo(0, 0)
        },
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
            //controlla i seguaci e numero seguaci
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
                            followers[0].num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
            //controlla i seguiti e numero seguiti
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
                            following[0].num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
            //controlla se l'utente segue questo user
            userData3
                .doc(mail)
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        segui.segui = true
                        console.log('lo segui')
                    } else {
                        segui.segui = false
                        console.log('non lo segui')
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        },
        followUnfollow() {
            var db = firebase.firestore()
            var mail = this.email
            var username = this.username
            var myEmail = this.user.email
            var myUsername = this.myUsername
            var segui = this.segui
            if (segui.segui) {
                db.collection('utenti')
                    .doc(this.user.email)
                    .collection('following')
                    .doc(mail)
                    .delete()
                    .then(function() {
                        segui.segui = false
                    })
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
                db.collection('utenti')
                    .doc(mail)
                    .collection('followers')
                    .doc(this.user.email)
                    .delete()
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
            } else {
                db.collection('utenti')
                    .doc(this.user.email)
                    .collection('following')
                    .doc(mail)
                    .set({
                        username: username.un,
                    })

                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
                console.log(username.un, myUsername, this.$store.state.username)

                db.collection('utenti')
                    .doc(mail)
                    .collection('followers')
                    .doc(myEmail)
                    .set({
                        username: myUsername,
                    })
                    .then(function() {
                        segui.segui = true
                    })
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
            }
        },
    },
}
</script>

<style></style>
