<template>
    <v-row align="center" justify="center" v-if="this.loading">
        <v-col
            cols="1"
            class="text-center"
            style="height: 100vh; display: flex; align-items:center;"
        >
            <v-progress-circular
                :size="70"
                :width="7"
                color="indigo"
                indeterminate
            ></v-progress-circular>
        </v-col>
    </v-row>
    <v-row v-else class="mx-2">
        <v-col sm="10" md="9" class="centrata">
            <v-row>
                <v-col lg="3" sm="6" md="3">
                    <v-img
                        class="align-center rounded"
                        style="margin:0 auto"
                        :src="infoAlbum[0].cover"
                        width="90%"
                    ></v-img>
                </v-col>
                <v-col
                    lg="9"
                    sm="6"
                    md="9"
                    class="d-flex justify-end align-start flex-column col-12"
                >
                    <h1>{{ infoAlbum[0].title }}</h1>
                    <v-chip small v-if="infoAlbum[0].explicit" disabled class="my-1"
                        >Esplicito</v-chip
                    >
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
                        <li class="infoAlbum">Voto utenti: {{ infoAlbum[0].voto }}</li>
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
                                    :disabled="loading1"
                                >
                                    <v-icon size="50" v-if="daAscoltare.isDaAscoltare" color="blue"
                                        >mdi-book-remove-multiple</v-icon
                                    >
                                    <v-icon size="50" v-else color="grey"
                                        >mdi-book-plus-multiple-outline</v-icon
                                    >
                                </v-btn>
                            </v-row>
                            <p
                                class="zeroMargine font-weight-light caption text-center"
                                v-if="daAscoltare.isDaAscoltare"
                            >
                                Rimuovi dagli album da ascoltare
                            </p>
                            <p v-else class="zeroMargine font-weight-light caption text-center">
                                Aggiungi agli album da ascoltare
                            </p>
                        </v-col>
                        <v-col class="pa-0 my-2" align-self="start">
                            <v-row justify="center">
                                <v-btn
                                    icon
                                    @click="listened(), (loader = 'loading2')"
                                    height="50"
                                    width="50"
                                    :loading="loading2"
                                    :disabled="loading2"
                                >
                                    <v-icon size="50" v-if="ascoltato.isAscoltato" color="green"
                                        >mdi-folder-music</v-icon
                                    >
                                    <v-icon size="50" v-else color="grey"
                                        >mdi-folder-music-outline</v-icon
                                    >
                                </v-btn>
                            </v-row>
                            <p
                                class="zeroMargine font-weight-light caption text-center"
                                v-if="ascoltato.isAscoltato"
                            >
                                Rimuovi dagli ascoltati
                            </p>
                            <p v-else class="zeroMargine font-weight-light caption text-center">
                                Aggiungi agli ascoltati
                            </p>
                        </v-col>
                        <v-col class="pa-0 my-2" align-self="start">
                            <v-row justify="center">
                                <v-btn
                                    icon
                                    @click="favourite(), (loader = 'loading3')"
                                    height="50"
                                    width="50"
                                    :loading="loading3"
                                    :disabled="loading3"
                                >
                                    <v-icon size="50" color="pink" v-if="preferito.isPreferito"
                                        >mdi-heart</v-icon
                                    >
                                    <v-icon color="grey" size="50" v-else>mdi-heart-outline</v-icon>
                                </v-btn>
                            </v-row>
                            <p
                                class="zeroMargine font-weight-light caption text-center"
                                v-if="preferito.isPreferito"
                            >
                                Rimuovi dai preferiti
                            </p>
                            <p v-else class="zeroMargine font-weight-light caption text-center">
                                Aggiungi ai preferiti
                            </p>
                        </v-col>
                    </v-row>
                    <!--
                    <v-divider></v-divider>
                    -->
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
            <!--
                <p
                    class="text-left font-weight-normal"
                    display="inline-block"
                >Genere: {{ infoAlbum[0].genre }}</p>
                <p class="text-left font-weight-normal" display="inline-block">
                    Numero tracce:
                    {{ infoAlbum[0].numberOfTracks }}
                </p>
                <p
                    class="text-left font-weight-normal"
                    display="inline-block"
                >Data uscita: {{ infoAlbum[0].releaseDate }}</p>
            -->
        </v-col>
        <v-col v-if="infoAlbum[0] != undefined" md="9" sm="10" class="centrata">
            <v-list class="mt-2">
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
            <h2 class="mx-2" style="display: inline">Recensioni</h2>
            <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }" v-if="user != null">
                    <v-btn
                        color="primary"
                        class="mx-2"
                        style="display: inline; float: right"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >Scrivi</v-btn
                    >
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Recensione</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Recensione"
                                        v-model="recensione"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="save_review">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div v-if="reviews.length != 0">
                <v-card v-for="review in reviews" :key="review.recensione" flat class="mt-2 mx-2">
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
                <!--      <router-link
                    :to="{
                        name: 'profile',
                        path: '/profile/:username',
                        params: {
                            username: review.utente,
                        },
                    }"
                >
                    <p>{{ review.utente }}</p>
                </router-link>
                <p>{{ review.recensione }}</p>-->
            </div>
            <div v-else class="d-flex justify-center">
                <v-container
                    class="d-inline-flex justify-center flex-column align-center"
                    style="border-radius: 50%; max-height:400px; max-width:400px; margin:10px"
                >
                    <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                        <path
                            fill="#ececec"
                            d="M20 12A8 8 0 1 0 12 20A8 8 0 0 0 20 12M22 12A10 10 0 1 1 12 2A10 10 0 0 1 22 12M15.5 8A1.5 1.5 0 1 1 14 9.5A1.54 1.54 0 0 1 15.5 8M10 9.5A1.5 1.5 0 1 1 8.5 8A1.54 1.54 0 0 1 10 9.5M17 15H13A4 4 0 0 0 9.53 17L7.8 16A6 6 0 0 1 13 13H17Z"
                        />
                    </svg>
                    <p class="centrata" style="width: 60%; text-align: center">
                        Nessuna recensione
                    </p>
                </v-container>
            </div>
        </v-col>
    </v-row>
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
            user: this.$store.state.user,
            username: this.$store.state.username,
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
        }
    },
    created: function() {
        this.scrollToTop()
        var id = this.$route.params.id
        axios({
            url: 'https://api.deezer.com/album/' + id + '&output=jsonp',
            adapter: jsonpAdapter,
        })
            .then(response => {
                var albumData = {
                    title: response.data.title,
                    cover: response.data.cover_big,
                    artist: response.data.artist['name'],
                    genre: response.data.genres['data'][0]['name'],
                    genreId: response.data.genres['data'][0][id],
                    numberOfTracks: response.data.nb_tracks,
                    explicit: response.data.explicit_lyrics,
                    releaseDate: response.data.release_date,
                    artistId: response.data.artist['id'],
                    artistPicture: response.data.artist['picture_medium'],
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
                //.then(() => this.caricato())
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
            if (this.ascoltato.isAscoltato == true) {
                userData.delete()
                rating[0] = 0
                this.ascoltato.isAscoltato = false
                this.setVotoMedio()
            } else {
                userData.set({ titolo: title, rating: rating[0] })
                this.ascoltato.isAscoltato = true
            }
        },
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
            if (this.daAscoltare.isDaAscoltare == true) {
                userData.delete()
                this.daAscoltare.isDaAscoltare = false
            } else {
                userData.set({ titolo: title })
                this.daAscoltare.isDaAscoltare = true
            }
        },
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
            if (this.preferito.isPreferito == true) {
                userData.delete()
                this.preferito.isPreferito = false
            } else {
                userData.set({ titolo: title })
                this.preferito.isPreferito = true
            }
        },
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
                    console.log('Recensione inserita')
                })
                .catch(function(error) {
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
        rating: function() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.$route.params.id
            var newRating = this.rating
            var title = this.infoAlbum[0].title
            db.collection('utenti')
                .doc(email)
                .collection('ascoltati')
                .doc(id.toString())
                .set({
                    rating: newRating[0],
                    titolo: title,
                })
                .then(() => this.setVotoMedio())
            this.ascoltato.isAscoltato = true
        },
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
</style>
