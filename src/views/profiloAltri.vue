<template>
    <div>
        <div v-if="loading == true">
            <div>
                <v-row class="mx-2">
                    <v-col v-if="this.$vuetify.breakpoint.name == 'xs'">
                        <v-skeleton-loader
                            type="image"
                            width="250"
                            class="centrata"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col v-else>
                        <v-skeleton-loader type="image" width="250"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row class="mx-2">
                    <v-col class="col-12">
                        <v-skeleton-loader
                            type="heading"
                            width="30%"
                            min-width="200px"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col class="col-12">
                        <v-skeleton-loader
                            type="text"
                            width="10%"
                            min-width="200px"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col class="col-12">
                        <v-skeleton-loader type="button"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <v-tabs background-color="primary" dark grow>
                <v-tabs-slider></v-tabs-slider>
                <v-tab>Seguaci</v-tab>
                <v-tab>Seguiti</v-tab>
                <v-tab>Ascoltati</v-tab>
                <v-tab>Da ascoltare</v-tab>
                <v-tab>Preferiti</v-tab>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col v-for="n in 6" :key="n" class="pb-3 px-1 col-12">
                            <v-skeleton-loader
                                class="mx-2"
                                type="list-item-avatar"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col v-for="n in 6" :key="n" class="pb-3 px-1 col-12">
                            <v-skeleton-loader
                                class="mx-2"
                                type="list-item-avatar"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col
                            v-for="n in 12"
                            :key="n"
                            xl="2"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader class="mx-2" type="card"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col
                            v-for="n in 12"
                            :key="n"
                            xl="2"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader class="mx-2" type="card"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col
                            v-for="n in 12"
                            :key="n"
                            xl="2"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader class="mx-2" type="card"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </div>
        <div v-else-if="esiste.esiste == false" class="d-flex justify-center">
            <v-container
                class="d-inline-flex justify-center flex-column align-center"
                style="border-radius: 50%; height:400px;width:400px; margin:10px"
            >
                <svg style="width:80%;max-width:150px;max-height:150px;" viewBox="0 0 24 24">
                    <path
                        fill="#2d96c8"
                        d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z"
                    />
                </svg>
                <p style="width: 60%; text-align: center">Utente inesistente</p>
            </v-container>
        </div>
        <div v-else>
            <div class="mx-2">
                <v-img
                    v-if="this.$vuetify.breakpoint.name == 'xs'"
                    id="proPic"
                    alt="Immagine profilo"
                    height="250"
                    width="250"
                    class="centrata"
                    :src="src.src"
                    title="Immagine profilo"
                ></v-img>
                <v-img
                    v-else
                    id="proPic"
                    alt="Immagine profilo"
                    height="250"
                    width="250"
                    class="ma-2"
                    :src="src.src"
                    title="Immagine profilo"
                ></v-img>
                <div class="mx-2">
                    <h1 style="display: inline">{{ username.un }}</h1>
                    <p>{{ email.email }}</p>
                    <div v-if="user != null" class="my-2" @click="followUnfollow()">
                        <v-btn v-if="segui.segui" rounded color="primary" name="Pulsante unfollow"
                            >Non seguire più</v-btn
                        >
                        <v-btn color="primary" v-else name="Pulsante follow">Segui</v-btn>
                    </div>
                </div>
            </div>
            <v-tabs background-color="primary" dark grow>
                <v-tab>Seguaci ({{ followers[0].num }})</v-tab>
                <v-tab>Seguiti ({{ following[0].num }})</v-tab>
                <v-tab>Ascoltati ({{ ascoltati.num }})</v-tab>
                <v-tab>Da ascoltare ({{ daAscoltare.num }})</v-tab>
                <v-tab>Preferiti ({{ preferiti.num }})</v-tab>

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
                            <svg
                                style="width:80%;max-width:150px;max-height:150px;"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#2d96c8"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <p style="width: 60%; text-align: center">
                                Ops, nessun seguace trovato.
                            </p>
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
                            <svg
                                style="width:80%;max-width:150px;max-height:150px;"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#2d96c8"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <p style="width: 60%; text-align: center">
                                Ops, nessun utente seguito.
                            </p>
                        </v-container>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <cardContainerFirebase
                        :idArray="ascoltati.album"
                        v-if="ascoltati.num != 0"
                        v-on:login="snackMsg"
                    />
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:500px;width:500px; margin:10px"
                        >
                            <svg
                                style="width:80%;max-width:150px;max-height:150px;"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#2d96c8"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <h4 style="width: 60%; text-align: center" class="my-3">
                                Nessun album tra gli ascoltati.
                            </h4>
                        </v-container>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <cardContainerFirebase
                        :idArray="daAscoltare.album"
                        v-if="ascoltati.num != 0"
                        v-on:login="snackMsg"
                    />
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:500px;width:500px; margin:10px"
                        >
                            <svg
                                style="width:80%;max-width:150px;max-height:150px;"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#2d96c8"
                                    d="M12,1A9,9 0 0,1 21,10V17C21,17.62 20.81,18.19 20.5,18.67L15,13.18V12H19V10A7,7 0 0,0 12,3C10,3 8.23,3.82 6.96,5.14L5.55,3.72C7.18,2.04 9.47,1 12,1M2.78,3.5L20.5,21.22L19.23,22.5L16.73,20H15V18.27L9,12.27V20H6A3,3 0 0,1 3,17V10C3,8.89 3.2,7.82 3.57,6.84L1.5,4.77L2.78,3.5M5.17,8.44C5.06,8.94 5,9.46 5,10V12H8.73L5.17,8.44Z"
                                />
                            </svg>
                            <h4 style="width: 60%; text-align: center" class="my-3">
                                Nessun album tra i da ascoltare.
                            </h4>
                        </v-container>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <cardContainerFirebase
                        :idArray="preferiti.album"
                        v-if="preferiti.num != 0"
                        v-on:login="snackMsg"
                    />
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:500px;width:500px; margin:10px;"
                        >
                            <svg
                                style="width:80%;max-width:150px;max-height:150px;"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#2d96c8"
                                    d="M1,4.27L2.28,3L20,20.72L18.73,22L15.18,18.44L13.45,20.03L12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,7.55 2.23,6.67 2.63,5.9L1,4.27M7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,11.07 20.42,13.32 17.79,15.97L5.27,3.45C5.95,3.16 6.7,3 7.5,3Z"
                                />
                            </svg>
                            <h4 style="width: 60%; text-align: center" class="my-3">
                                Nessun album tra i preferiti.
                            </h4>
                        </v-container>
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
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
            src: { src: '' },
            loading: true,
            cont: { cont: 0 },
            esiste: { esiste: true },
        }
    },
    created() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
        this.scrollToTop()
        //Preleva l'immagine di profilo dallo storage
        var storage = firebase.storage()
        var pathReference = storage.ref('profile')
        var src = this.src
        var username = this.$route.params.username
        pathReference
            .child('/' + username + '/profile.jpg')
            .getDownloadURL()
            .then(function(url) {
                src.src = url
            })
            .catch(() => this.setDefaultPic(storage, src))

        var db = firebase.firestore()
        var mail = this.email
        var userData = db.collection('utenti').where('username', '==', username)
        var exists = this.esiste
        //controlla se il profilo esiste
        userData
            .get()
            .then(function(querySnapshot) {
                if (querySnapshot.empty) {
                    exists.esiste = false
                } else {
                    querySnapshot.forEach(function(doc) {
                        mail.email = doc.id
                    })
                }
            })
            .then(() => this.checkInfo())
            .catch(function(error) {
                console.log('Error getting document:', error)
            })
    },
    methods: {
        snackMsg(msg) {
            this.$emit('login', msg)
        },
        //Se l'immagine non esiste, allora preleva quella di default
        setDefaultPic(storage, src) {
            var pathReference = storage.ref('profile')
            pathReference
                .child('/default.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
        },
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        //Se l'utente esiste ne preleva le informazioni dal DB
        checkInfo() {
            if (this.esiste.esiste == false) {
                this.loading = false
            } else {
                var cont = this.cont
                var db = firebase.firestore()
                var mail = this.email
                var segui = this.segui
                var userData1 = db
                    .collection('utenti')
                    .doc(mail.email)
                    .collection('followers')
                var userData2 = db
                    .collection('utenti')
                    .doc(mail.email)
                    .collection('following')

                if (this.user != null) {
                    var userData3 = db
                        .collection('utenti')
                        .doc(this.user.email)
                        .collection('following')
                    //controlla se l'utente attualmente loggato segue questo user
                    userData3
                        .doc(mail.email)
                        .get()
                        .then(function(doc) {
                            if (doc.exists) {
                                segui.segui = true
                            } else {
                                segui.segui = false
                            }
                        })
                        .catch(function(error) {
                            console.log('Error getting document:', error)
                        })
                }

                var ascoltati = db
                    .collection('utenti')
                    .doc(mail.email)
                    .collection('ascoltati')
                    .orderBy('titolo')

                var daAscoltare = db
                    .collection('utenti')
                    .doc(mail.email)
                    .collection('daAscoltare')
                    .orderBy('titolo')

                var preferiti = db
                    .collection('utenti')
                    .doc(mail.email)
                    .collection('preferiti')
                    .orderBy('titolo')

                var followers = this.followers
                var following = this.following
                var listened = this.ascoltati
                var toListen = this.daAscoltare
                var favourite = this.preferiti

                //controlla i seguaci e numero seguaci dell'user
                userData1
                    .get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty == false) {
                            querySnapshot.forEach(function(doc) {
                                //console.log(doc.id, ' => ', doc.data())
                                var follower = {
                                    email: doc.id,
                                    username: doc.data().username,
                                }
                                followers[0].users.push(follower)
                                followers[0].num += 1
                            })
                        }
                        cont.cont = cont.cont + 1
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                //controlla i seguiti e numero seguiti dell'user
                userData2
                    .get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty == false) {
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
                        cont.cont = cont.cont + 1
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                //controlla album negli 'ascoltati' dell'user
                ascoltati
                    .get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty == false) {
                            querySnapshot.forEach(function(doc) {
                                var album = {
                                    albumId: doc.id,
                                    titolo: doc.data().titolo,
                                    artista: doc.data().artista,
                                    cover: doc.data().cover,
                                }
                                listened.album.push(album)
                                listened.num += 1
                            })
                        }
                        cont.cont = cont.cont + 1
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                //controlla album nei 'da ascoltare' dell'user
                daAscoltare
                    .get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty == false) {
                            querySnapshot.forEach(function(doc) {
                                //console.log(doc.id, ' => ', doc.data())
                                var album = {
                                    albumId: doc.id,
                                    titolo: doc.data().titolo,
                                    artista: doc.data().artista,
                                    cover: doc.data().cover,
                                }
                                toListen.album.push(album)
                                toListen.num += 1
                            })
                        }
                        cont.cont = cont.cont + 1
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                //controlla album nei 'preferiti' dell'user
                preferiti
                    .get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty == false) {
                            querySnapshot.forEach(function(doc) {
                                var album = {
                                    albumId: doc.id,
                                    titolo: doc.data().titolo,
                                    artista: doc.data().artista,
                                    cover: doc.data().cover,
                                }
                                favourite.album.push(album)
                                favourite.num += 1
                            })
                        }
                        cont.cont = cont.cont + 1
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
            }
        },
        //se l'utente attualmente loggato segue questo user, lo smette di seguire
        //se l'utente attualmente loggato NON segue questo user, lo segue
        followUnfollow() {
            if (this.user != null) {
                var db = firebase.firestore()
                var mail = this.email
                var username = this.username
                var myEmail = this.user.email
                var myUsername = this.myUsername
                var segui = this.segui
                if (segui.segui) {
                    //toglie l'utente che si vuole smettere di seguire dai following dell'utente attualmente loggato
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
                    //toglie l'utente attualmente loggato dai follower dell'utente che si vuole smettere di seguire
                    db.collection('utenti')
                        .doc(mail.email)
                        .collection('followers')
                        .doc(this.user.email)
                        .delete()
                        .catch(function(error) {
                            console.error('Error removing document: ', error)
                        })
                } else {
                    //aggiunge l'utente attualmente loggato ai following dell'utente che si vuole cominciare a seguire
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
                    //console.log(this.username.un, myUsername, localStorage.getItem('username'))
                    //aggiunge l'utente che si vuole cominciare a seguire ai follower dell'utente attualmente loggato
                    db.collection('utenti')
                        .doc(mail.email)
                        .collection('followers')
                        .doc(myEmail)
                        .set({
                            username: myUsername.un,
                        })
                        .then(function() {
                            segui.segui = true
                            //console.log(myUsername.un)
                        })
                        .catch(function(error) {
                            console.error('Error removing document: ', error)
                        })
                }
            }
        },
    },
    computed: {
        contLoad() {
            return this.cont.cont
        },
    },
    watch: {
        contLoad() {
            if (this.cont.cont >= 5) {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped>
.centrata {
    margin: 2em auto;
}
</style>
