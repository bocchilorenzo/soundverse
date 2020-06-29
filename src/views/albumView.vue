<template>
    <v-container class="fill-width" fluid>
        <v-row v-if="this.loading">
            <v-col sm="10" md="9" class="centrata">
                <v-row class="ma-2">
                    <div
                        v-if="
                            this.$vuetify.breakpoint.name == 'xs' ||
                                this.$vuetify.breakpoint.name == 'sm'
                        "
                        class="centrata"
                        style="width: 100%"
                    >
                        <v-skeleton-loader
                            ref="skeleton"
                            type="image"
                            width="100%"
                            max-width="320px"
                            class="centrata"
                        ></v-skeleton-loader>
                        <v-row class="ma-2">
                            <v-skeleton-loader
                                ref="skeleton"
                                type="heading"
                                width="50em"
                                class="mx-0"
                            ></v-skeleton-loader>
                        </v-row>
                        <v-row class="ma-2">
                            <v-skeleton-loader ref="skeleton" type="text" width="50em" class="mx-0"></v-skeleton-loader>
                        </v-row>
                        <v-row class="ma-2">
                            <v-skeleton-loader
                                ref="skeleton"
                                type="sentences"
                                width="50em"
                                class="mx-0"
                            ></v-skeleton-loader>
                        </v-row>
                        <br />
                    </div>
                    <div v-else class="d-flex flex-row" style="width: 100%">
                        <v-skeleton-loader ref="skeleton" type="image" width="300px" class="mx-0"></v-skeleton-loader>
                        <v-row class="ml-3 pt-2 d-flex flex-row" align="center" style="width:100%">
                            <v-col class="ma-2 col-12">
                                <v-skeleton-loader
                                    ref="skeleton"
                                    type="heading"
                                    width="100%"
                                    class="mx-0"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col class="ma-2 col-12">
                                <v-skeleton-loader
                                    ref="skeleton"
                                    type="text"
                                    width="100%"
                                    class="mx-0"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col class="ma-2 col-12">
                                <v-skeleton-loader
                                    ref="skeleton"
                                    type="sentences"
                                    width="100%"
                                    class="mx-0"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <br />
                <v-row style="width:100%" class="mx-0">
                    <v-col class="centrata col-12">
                        <v-sheet width="100%" height="300px" color="sheet" class="centraRadius"></v-sheet>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-else-if="esiste.esiste == false" class="d-flex justify-center">
            <v-container
                class="d-inline-flex justify-center flex-column align-center"
                style="border-radius: 50%; height:400px;width:400px; margin:10px"
            >
                <svg style="width:80%;max-width:150px;max-height:150px" viewBox="0 0 24 24">
                    <path
                        fill="#2d96c8"
                        d="M2,5.27L3.28,4L20,20.72L18.73,22L9,12.27V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V10.27L2,5.27M21,3V15.5C21,16.5 20.57,17.42 19.88,18.06L14.94,13.12C15.58,12.43 16.5,12 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L10.17,8.35L7.66,5.84L21,3Z"
                    />
                </svg>
                <p style="width: 60%; text-align: center">Album inesistente</p>
            </v-container>
        </v-row>
        <v-row v-else>
            <v-col sm="10" md="9" class="centrata">
                <v-row>
                    <v-col lg="3" sm="6" md="3">
                        <v-img
                            class="align-center rounded centrata"
                            :src="infoAlbum[0].cover"
                            width="90%"
                        ></v-img>
                        <a target="_blank" :href="infoAlbum[0].share">
                            <v-img
                                v-if="this.$vuetify.theme.dark"
                                src="../assets/light.png"
                                class="align-center"
                                style="margin:1em auto 0;"
                                width="40%"
                                min-width="18px"
                            ></v-img>
                            <v-img
                                v-else
                                src="../assets/dark.png"
                                class="align-center"
                                style="margin:1em auto 0;"
                                width="40%"
                                min-width="18px"
                            ></v-img>
                        </a>
                    </v-col>
                    <v-col
                        lg="9"
                        sm="6"
                        md="9"
                        class="d-flex justify-end align-start flex-column col-12"
                    >
                        <h1>{{ infoAlbum[0].title }}</h1>
                        <v-chip small v-if="infoAlbum[0].explicit" disabled class="my-1">Esplicito</v-chip>
                        <router-link
                            :to="{
                                name: 'artist',
                                path: '/artist/:artista',
                                params: {
                                    artista: infoAlbum[0].artistId,
                                },
                            }"
                        >
                            <h3>{{ infoAlbum[0].artist }}</h3>
                        </router-link>
                        <ul class="info-list">
                            <li class="infoAlbumMain">Tracce: {{ infoAlbum[0].numberOfTracks }}</li>
                            <li class="infoAlbum">Data uscita: {{ infoAlbum[0].releaseDate }}</li>
                            <li class="infoAlbum">Voto utenti: {{ infoAlbum[0].voto.toFixed(2) }}</li>
                        </ul>
                        <v-row justify="space-around" no-gutters>
                            <v-col class="pa-0 my-2" align-self="start">
                                <v-row justify="center">
                                    <v-btn
                                        icon
                                        @click="toListen(), (loader = 'loading1')"
                                        height="50"
                                        width="50"
                                        :loading="loading1"
                                        :disabled="loading1 || user == null"
                                    >
                                        <v-icon
                                            size="50"
                                            v-if="daAscoltare.isDaAscoltare"
                                            color="blue"
                                        >mdi-book-remove-multiple</v-icon>
                                        <v-icon
                                            size="50"
                                            v-else
                                            color="grey"
                                        >mdi-book-plus-multiple-outline</v-icon>
                                    </v-btn>
                                </v-row>
                                <p
                                    class="zeroMargine font-weight-light caption text-center"
                                    v-if="daAscoltare.isDaAscoltare"
                                >Rimuovi dagli album da ascoltare</p>
                                <p
                                    v-else
                                    class="zeroMargine font-weight-light caption text-center"
                                >Aggiungi agli album da ascoltare</p>
                            </v-col>
                            <v-col class="pa-0 my-2" align-self="start">
                                <v-row justify="center">
                                    <v-btn
                                        icon
                                        @click="listened(), (loader = 'loading2')"
                                        height="50"
                                        width="50"
                                        :loading="loading2"
                                        :disabled="loading2 || user == null"
                                    >
                                        <v-icon
                                            size="50"
                                            v-if="ascoltato.isAscoltato"
                                            color="green"
                                        >mdi-folder-music</v-icon>
                                        <v-icon
                                            size="50"
                                            v-else
                                            color="grey"
                                        >mdi-folder-music-outline</v-icon>
                                    </v-btn>
                                </v-row>
                                <p
                                    class="zeroMargine font-weight-light caption text-center"
                                    v-if="ascoltato.isAscoltato"
                                >Rimuovi dagli ascoltati</p>
                                <p
                                    v-else
                                    class="zeroMargine font-weight-light caption text-center"
                                >Aggiungi agli ascoltati</p>
                            </v-col>
                            <v-col class="pa-0 my-2" align-self="start">
                                <v-row justify="center">
                                    <v-btn
                                        icon
                                        @click="favourite(), (loader = 'loading3')"
                                        height="50"
                                        width="50"
                                        :loading="loading3"
                                        :disabled="loading3 || user == null"
                                    >
                                        <v-icon
                                            size="50"
                                            color="pink"
                                            v-if="preferito.isPreferito"
                                        >mdi-heart</v-icon>
                                        <v-icon color="grey" size="50" v-else>mdi-heart-outline</v-icon>
                                    </v-btn>
                                </v-row>
                                <p
                                    class="zeroMargine font-weight-light caption text-center"
                                    v-if="preferito.isPreferito"
                                >Rimuovi dai preferiti</p>
                                <p
                                    v-else
                                    class="zeroMargine font-weight-light caption text-center"
                                >Aggiungi ai preferiti</p>
                            </v-col>
                        </v-row>
                        <v-row justify="center" no-gutters>
                            <v-col class="centrata">
                                <p class="ma-2">Voto:</p>
                                <v-rating
                                    class="ma-1"
                                    x-large
                                    v-model="rating[0]"
                                    color="primary"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    half-increments
                                    hover
                                ></v-rating>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-if="infoAlbum[0] != undefined" md="9" sm="10" class="centrata">
                <v-list class="mt-2 centraRadius" color="sheet">
                    <div v-for="(track, index) in infoAlbum[0].trackList" :key="track.songId">
                        <v-list-item @click="$emit('play', track.songPreview)">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ index + 1 }} -
                                    {{ track.songTitle }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list>
            </v-col>
            <v-col cols="12">
                <h2 class="mx-2" style="display: inline;">Recensioni</h2>
                <v-dialog v-model="dialog" max-width="600px" overlay-color="secondary">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            class="mx-2"
                            style="display: inline; float: right"
                            dark
                            :disabled="user == null"
                            v-bind="attrs"
                            v-on="on"
                        >Scrivi</v-btn>
                    </template>
                    <v-card>
                        <!--
                    <v-card-title>
                        <span class="headline">Recensione</span>
                    </v-card-title>
                        -->
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea
                                            outlined
                                            name="input-7-4"
                                            label="Recensione"
                                            v-model="recensione"
                                            style="width: 100%"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="danger" text @click="dialog = false">Chiudi</v-btn>
                            <v-btn color="primary" text @click="save_review">Salva</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <div v-if="reviews.length != 0">
                    <v-card
                        v-for="review in reviews"
                        :key="review.recensione"
                        flat
                        class="mt-2 mx-2"
                    >
                        <v-card-text>
                            <div class="mb-2 d-flex flex-column">
                                <router-link
                                    :to="{
                                        name: 'user',
                                        path: '/user/:username',
                                        params: { username: review.utente },
                                        props: true,
                                    }"
                                >
                                    <strong class="title">{{ review.utente }}</strong>
                                </router-link>
                                <v-label>Data: {{ review.timestamp }}</v-label>
                                <v-spacer></v-spacer>
                            </div>
                            <span>{{ review.recensione }}</span>
                        </v-card-text>
                    </v-card>
                </div>
                <div v-else class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; max-height:400px; max-width:400px; margin:10px"
                    >
                        <svg
                            style="width:80%;max-width:150px;max-height:150px;"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#2d96c8"
                                d="M20 12A8 8 0 1 0 12 20A8 8 0 0 0 20 12M22 12A10 10 0 1 1 12 2A10 10 0 0 1 22 12M15.5 8A1.5 1.5 0 1 1 14 9.5A1.54 1.54 0 0 1 15.5 8M10 9.5A1.5 1.5 0 1 1 8.5 8A1.54 1.54 0 0 1 10 9.5M17 15H13A4 4 0 0 0 9.53 17L7.8 16A6 6 0 0 1 13 13H17Z"
                            />
                        </svg>
                        <p
                            class="centrata"
                            style="width: 60%; text-align: center"
                        >Nessuna recensione.</p>
                    </v-container>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
export default {
    name: 'albumInformation',
    data() {
        return {
            loading: true,
            tmpLoading: 0,
            infoAlbum: [],
            user: JSON.parse(localStorage.getItem('user')),
            username: localStorage.getItem('username'),
            rating: [0],
            oldRating: [0],
            preferito: { isPreferito: false },
            ascoltato: { isAscoltato: false },
            daAscoltare: { isDaAscoltare: false },
            loader: null,
            loading1: false,
            loading2: false,
            loading3: false,
            dialog: false,
            recensione: '',
            reviews: [],
            esiste: { esiste: true },
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
        this.scrollToTop()
        var id = this.$route.params.id
        //preleva le info dell'artista tramite chiamata API
        axios({
            url: 'https://api.deezer.com/album/' + id + '&output=jsonp',
            adapter: jsonpAdapter,
        })
            .then(response => {
                if (response.data.error == undefined) {
                    var albumData = {
                        title: response.data.title,
                        cover: response.data.cover_big,
                        cover_medium: response.data.cover_medium,
                        artist: response.data.artist['name'],
                        genre: response.data.genres['data'][0]['name'],
                        genreId: response.data.genres['data'][0][id],
                        numberOfTracks: response.data.nb_tracks,
                        explicit: response.data.explicit_lyrics,
                        releaseDate: response.data.release_date,
                        artistId: response.data.artist['id'],
                        artistPicture: response.data.artist['picture_medium'],
                        share: response.data.share,
                        trackList: [],
                        voto: 0,
                        numVoti: 0,
                    }
                    for (var i = 0; i < response.data.tracks['data'].length; i++) {
                        albumData.trackList[i] = {
                            songId: response.data.tracks['data'][i]['id'],
                            songTitle: response.data.tracks['data'][i]['title'],
                            songPreview: response.data.tracks['data'][i]['preview'],
                        }
                    }
                    this.infoAlbum.push(albumData)
                } else {
                    this.esiste.esiste = false
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .then(() => this.getVotoMedio())
            .finally(() => this.checkAdded())
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        checkAdded() {
            if (this.user != null) {
                var id = this.$route.params.id
                var ascoltato = this.ascoltato
                var daAscoltare = this.daAscoltare
                var rating = this.rating
                var oldRating = this.oldRating
                //this.loading = false
                var preferito = this.preferito
                var db = firebase.firestore()
                var userData = db.collection('utenti').doc(this.user.email)
                this.getReviews()
                //controlla se l'album è negli ascoltati dell'utente
                userData
                    .collection('ascoltati')
                    .doc(id.toString())
                    .get()
                    .then(function(doc) {
                        if (doc.exists) {
                            rating[0] = doc.data().rating
                            oldRating[0] = doc.data().rating
                            ascoltato.isAscoltato = true
                        }
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.caricato())
                //controlla se l'album è nei da ascoltare dell'utente
                userData
                    .collection('daAscoltare')
                    .doc(id.toString())
                    .get()
                    .then(function(doc) {
                        if (doc.exists) {
                            daAscoltare.isDaAscoltare = true
                        }
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.caricato())
                //controlla se l'album è nei preferiti dell'utente
                userData
                    .collection('preferiti')
                    .doc(id.toString())
                    .get()
                    .then(function(doc) {
                        if (doc.exists) {
                            preferito.isPreferito = true
                            console.log('è tra i preferiti')
                        }
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
            } else {
                this.loading = null
            }
        },
        caricato() {
            this.tmpLoading++
            if (this.tmpLoading >= 3) {
                this.loading = false
            }
        },
        //aggiunge o elimina su firebase l'album agli ascoltati dell'utente
        listened() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.$route.params.id
            var rating = this.rating
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('ascoltati')
                .doc(id.toString())
            var title = this.infoAlbum[0].title
            var artist = this.infoAlbum[0].artist
            var coverM = this.infoAlbum[0].cover_medium
            if (this.ascoltato.isAscoltato == true) {
                userData.delete()
                rating[0] = 0
                this.ascoltato.isAscoltato = false
                this.setVotoMedio()
                this.$emit('login', 'Rimosso dagli ascoltati')
            } else {
                userData.set({ titolo: title, rating: rating[0], artista: artist, cover: coverM })
                this.ascoltato.isAscoltato = true
                this.$emit('login', 'Aggiunto agli ascoltati')
            }
        },
        //aggiunge o elimina su firebase l'album ai da ascoltare dell'utente
        toListen() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.$route.params.id
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('daAscoltare')
                .doc(id.toString())
            var title = this.infoAlbum[0].title
            var artist = this.infoAlbum[0].artist
            var coverM = this.infoAlbum[0].cover_medium
            if (this.daAscoltare.isDaAscoltare == true) {
                userData.delete()
                this.daAscoltare.isDaAscoltare = false
                this.$emit('login', 'Rimosso dalla coda da ascoltare')
            } else {
                userData.set({ titolo: title, artista: artist, cover: coverM })
                this.daAscoltare.isDaAscoltare = true
                this.$emit('login', 'Aggiunto alla coda da ascoltare')
            }
        },
        //aggiunge o elimina su firebase l'album ai preferiti dell'utente
        favourite() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.$route.params.id
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('preferiti')
                .doc(id.toString())
            var title = this.infoAlbum[0].title
            var artist = this.infoAlbum[0].artist
            var coverM = this.infoAlbum[0].cover_medium
            if (this.preferito.isPreferito == true) {
                userData.delete()
                this.preferito.isPreferito = false
                this.$emit('login', 'Rimosso dai preferiti')
            } else {
                userData.set({ titolo: title, artista: artist, cover: coverM })
                this.preferito.isPreferito = true
                this.$emit('login', 'Aggiunto ai preferiti')
            }
        },
        //salva la recensione dell'album con timestamp e nome utente
        save_review() {
            var db = firebase.firestore()
            var recensioneTmp = this.recensione
            var mail = this.user.email
            var id = this.$route.params.id
            var time = Date.now()
            var review = db
                .collection('album')
                .doc(id.toString())
                .collection('reviews')
            review
                .add({
                    utente: mail,
                    recensione: recensioneTmp,
                    timestamp: time,
                })
                .then(function() {
                    this.$emit('login', 'Recensione inserita')
                })
                .catch(function(error) {
                    this.$emit('login', "Errore nell'aggiunta")
                    console.log('Error: ', error)
                })
            var rec = {
                utente: this.username,
                recensione: recensioneTmp,
                timestamp: time,
            }
            this.reviews.unshift(rec)
            this.dialog = false
        },
        //preleva le review dell'album da firebase
        getReviews() {
            var db = firebase.firestore()
            var id = this.$route.params.id
            var recensioni = this.reviews
            var reviews = db
                .collection('album')
                .doc(id.toString())
                .collection('reviews')
                .orderBy('timestamp', 'desc')
            reviews
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        recensioni.push(doc.data())
                    })
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error)
                })
                .then(() => this.emailToUsername())
        },
        emailToUsername() {
            var db = firebase.firestore()
            var userData = db.collection('utenti')
            var email = ''
            var i = 0
            var usernameArr = []
            if (this.reviews.length == 0) {
                this.loading = false
            }
            for (i = 0; i < this.reviews.length; i++) {
                email = this.reviews[i].utente
                userData
                    .doc(email)
                    .get()
                    .then(function(querySnapshot) {
                        usernameArr.push(querySnapshot.data())
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.switch(usernameArr))
                this.reviews[i].timestamp = this.timeConverter(this.reviews[i].timestamp)
            }
        },
        switch(usernameArr) {
            if (usernameArr.length == this.reviews.length) {
                for (var i = 0; i < this.reviews.length; i++) {
                    this.reviews[i].utente = usernameArr[i].username
                }
                this.loading = false
            }
        },
        //Metodo per convertire la data da timestamp al formato GG-MM-AAAA HH:MM:SS
        timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp)
            var year = a.getFullYear()
            var month = a.getMonth() < 10 ? '0' + a.getMonth() : a.getMonth()
            var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate()
            var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
            var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
            var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()
            var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec
            return time
        },
        getVotoMedio() {
            var id = this.$route.params.id
            var info = this.infoAlbum
            var db = firebase.firestore()
            var media = db.collection('album').doc(id.toString())
            media
                .get()
                .then(function(doc) {
                    if (doc.exists != false) {
                        info[0].voto = doc.data().mediaVoto
                        info[0].numVoti = doc.data().numeroVoti
                    }
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error)
                })
        },
        setVotoMedio() {
            var id = this.$route.params.id
            var db = firebase.firestore()
            var media = db.collection('album').doc(id.toString())
            var tmp = 0
            var newNumber = 0
            if (this.rating[0] == 0) {
                tmp = this.infoAlbum[0].voto * this.infoAlbum[0].numVoti - this.oldRating[0]
                newNumber = this.infoAlbum[0].numVoti - 1
            } else {
                if (this.oldRating[0] != 0) {
                    tmp = this.infoAlbum[0].voto * this.infoAlbum[0].numVoti - this.oldRating[0]
                    newNumber = this.infoAlbum[0].numVoti
                    tmp += this.rating[0]
                } else {
                    tmp = this.infoAlbum[0].voto * this.infoAlbum[0].numVoti + this.rating[0]
                    newNumber = this.infoAlbum[0].numVoti + 1
                }
            }
            var newRating = tmp / newNumber
            media.set({
                mediaVoto: newRating,
                numeroVoti: newNumber,
            })
            this.oldRating[0] = this.rating[0]
            this.infoAlbum[0].voto = newRating
            this.infoAlbum[0].numVoti = newNumber
        },
    },
    watch: {
        //se il rating di un album viene cambiato, viene aggiornato firebase in automatico
        rating: function() {
            if (this.user == null) {
                this.$emit('login', 'Effettua il login per votare')
            } else {
                var db = firebase.firestore()
                var email = this.user.email
                var id = this.$route.params.id
                var newRating = this.rating
                var title = this.infoAlbum[0].title
                var cover = this.infoAlbum[0].cover
                var artist = this.infoAlbum[0].artist
                db.collection('utenti')
                    .doc(email)
                    .collection('ascoltati')
                    .doc(id.toString())
                    .set({
                        rating: newRating[0],
                        titolo: title,
                        cover: cover,
                        artista: artist,
                    })
                    .then(() => this.setVotoMedio())
                this.$emit('login', 'Voto aggiornato')
                this.ascoltato.isAscoltato = true
            }
        },
        //permette di mettere 0.5s di caricamento una volta cliccato uno dei tasti di aggiunta album
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 500)

            this.loader = null
        },
    },
}
</script>
<style scoped>
#sticky {
    position: sticky;
    top: 64px;
}
.info-list {
    list-style: none;
    direction: ltr;
    margin: 0;
    padding: 0;
}
.infoAlbum,
.infoAlbumMain {
    display: inline-block;
}
.infoAlbum::before {
    content: '·';
    margin: 0 4px;
}
.rounded {
    border-radius: 0.5em;
}
.centrata {
    margin: 0 auto;
}
.zeroMargine {
    margin-bottom: 0;
}
.centraRadius {
    border-radius: 1em;
}
</style>
