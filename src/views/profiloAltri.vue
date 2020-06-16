<template>
    <div>
        <p>{{ username }}</p>
        <p>{{ email }}</p>
        <p>followers: {{ followers[0].num[0] }}</p>
        <p>following: {{ following[0].num[0] }}</p>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'profiloAltri',
    data() {
        return {
            username: this.$route.params.username,
            email: this.$route.params.email,
            following: [{ num: [0], users: [] }],
            followers: [{ num: [0], users: [] }],
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
                    console.log('bruh')
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

            var userData1 = db
                .collection('utenti')
                .doc(mail)
                .collection('followers')
            var userData2 = db
                .collection('utenti')
                .doc(mail)
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
        },
    },
}
</script>

<style></style>
