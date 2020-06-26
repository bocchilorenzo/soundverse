<template>
    <div>
        <div class="mx-2">
            <h1 style="display: inline" class="ma-2">{{ username.un }}</h1>
            <p>{{ email.email }}</p>
            <div class="my-2" @click="followUnfollow()">
                <v-btn v-if="segui.segui" color="primary">Non seguire più</v-btn>
                <v-btn color="primary" v-else>Segui</v-btn>
            </div>
        </div>
        <v-tabs background-color="primary" dark grow>
            <v-tab>Seguaci ({{ followers[0].num }})</v-tab>
            <v-tab>Seguiti ({{ following[0].num }})</v-tab>
            <v-tab>Ascoltati</v-tab>
            <v-tab>Da ascoltare</v-tab>
            <v-tab>Preferiti</v-tab>

            <v-tab-item>
                <usersContainer
                    v-if="followers[0].users.length != 0"
                    :arrayRisultati="followers[0].users"
                ></usersContainer>
                <div v-else class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#ececec"
                                d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                            />
                        </svg>
                        <p style="width: 60%; text-align: center">Ops, nessun utente trovato.</p>
                    </v-container>
                </div>
            </v-tab-item>
            <v-tab-item>
                <usersContainer
                    v-if="following[0].users.length != 0"
                    :arrayRisultati="following[0].users"
                ></usersContainer>
                <div v-else class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#ececec"
                                d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                            />
                        </svg>
                        <p style="width: 60%; text-align: center">Ops, nessun utente trovato.</p>
                    </v-container>
                </div>
            </v-tab-item>
            <!-- EMPTY STATE E CARICAMENTO DA INSERIRE -->
            <v-tab-item>
                <cardContainerFirebase :idArray="ascoltati.album" v-if="ascoltati.num != 0" />
            </v-tab-item>
            <v-tab-item>
                <cardContainerFirebase :idArray="daAscoltare.album" v-if="ascoltati.num != 0" />
            </v-tab-item>
            <v-tab-item>
                <cardContainerFirebase :idArray="preferiti.album" v-if="preferiti.num != 0" />
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import usersContainer from '../components/usersContainer'
import firebase from 'firebase'
import cardContainerFirebase from '../components/cardContainerFirebase'
export default {
    name: 'profiloAltri',
    components: {
        usersContainer,
        cardContainerFirebase,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            username: { un: this.$route.params.username },
            myUsername: { un: localStorage.getItem('username') },
            email: { email: null },
            following: [{ num: 0, users: [] }],
            followers: [{ num: 0, users: [] }],
            segui: { segui: false },
            ascoltati: { num: 0, album: [] },
            daAscoltare: { num: 0, album: [] },
            preferiti: { num: 0, album: [] },
        }
    },
    created() {
        this.scrollToTop()
        var db = firebase.firestore()
        var mail = this.email
        var username = this.$route.params.username
        var userData = db.collection('utenti').where('username', '==', username)
        //var check = this.checkInfo()
        //controlla se il profilo esiste
        userData
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id)
                    mail.email = doc.id
                })
            })
            .catch(function(error) {
                console.log('Error getting document:', error)
            })
            .then(this.checkInfo)
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        checkInfo() {
            var db = firebase.firestore()
            var mail = this.email
            var segui = this.segui
            //var username = this.$route.params.username
            var userData1 = db
                .collection('utenti')
                .doc(mail.email)
                .collection('followers')
            var userData2 = db
                .collection('utenti')
                .doc(mail.email)
                .collection('following')

            var userData3 = db
                .collection('utenti')
                .doc(this.user.email)
                .collection('following')

            var ascoltati = db
                .collection('utenti')
                .doc(mail.email)
                .collection('ascoltati')

            var daAscoltare = db
                .collection('utenti')
                .doc(mail.email)
                .collection('daAscoltare')

            var preferiti = db
                .collection('utenti')
                .doc(mail.email)
                .collection('preferiti')

            var followers = this.followers
            var following = this.following
            var listened = this.ascoltati
            var toListen = this.daAscoltare
            var favourite = this.preferiti

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
                                username: doc.data().username,
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
                            //console.log(doc.id, ' => ', doc.data())
                            var followin = {
                                email: doc.id,
                                username: doc.data().username,
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
                .doc(mail.email)
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        segui.segui = true
                        //console.log('lo segui')
                    } else {
                        segui.segui = false
                        //console.log('non lo segui')
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            ascoltati
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('nessun ascoltato')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            //console.log(doc.id, ' => ', doc.data())
                            var album = {
                                albumId: doc.id,
                            }
                            listened.album.push(album)
                            listened.num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            daAscoltare
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('nessun ascoltato')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            //console.log(doc.id, ' => ', doc.data())
                            var album = {
                                albumId: doc.id,
                            }
                            toListen.album.push(album)
                            toListen.num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            preferiti
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('nessun ascoltato')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            //console.log(doc.id, ' => ', doc.data())
                            var album = {
                                albumId: doc.id,
                            }
                            favourite.album.push(album)
                            favourite.num += 1
                        })
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
                    .doc(mail.email)
                    .delete()
                    .then(function() {
                        segui.segui = false
                    })
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
                db.collection('utenti')
                    .doc(mail.email)
                    .collection('followers')
                    .doc(this.user.email)
                    .delete()
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
            } else {
                db.collection('utenti')
                    .doc(myEmail)
                    .collection('following')
                    .doc(mail.email)
                    .set({
                        username: username.un,
                    })
                    .catch(function(error) {
                        console.error('Error removing document: ', error)
                    })
                console.log(this.username.un, myUsername, localStorage.getItem('username'))

                db.collection('utenti')
                    .doc(mail.email)
                    .collection('followers')
                    .doc(myEmail)
                    .set({
                        username: myUsername.un,
                    })
                    .then(function() {
                        segui.segui = true
                        console.log(myUsername.un)
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
