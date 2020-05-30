<template>
    <v-container class="fill-height" fluid>
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
        <v-row no-gutters v-else>
            <v-col cols="3">
                <div id="sticky">
                    <v-img
                        class="align-end"
                        :src="infoAlbum[0].cover"
                        width="100%"
                    ></v-img>

                    <p
                        class="text-left font-weight-normal"
                        display="inline-block"
                    >
                        Genere: {{ infoAlbum[0].genre }}
                    </p>
                    <p
                        class="text-left font-weight-normal"
                        display="inline-block"
                    >
                        Numero tracce:
                        {{ infoAlbum[0].numberOfTracks }}
                    </p>
                    <p
                        class="text-left font-weight-normal"
                        display="inline-block"
                    >
                        Data uscita: {{ infoAlbum[0].releaseDate }}
                    </p>
                </div>
            </v-col>
            <v-col v-if="infoAlbum[0] != undefined">
                <h1>{{ infoAlbum[0].title }}</h1>
                <v-chip
                    small
                    v-if="infoAlbum[0].explicit"
                    disabled
                    class="my-1"
                >
                    Esplicito
                </v-chip>
                <router-link
                    :to="{
                        name: 'artist',
                        path: '/artist/:artista',
                        params: {
                            artista: infoAlbum[0].artistId,
                        },
                    }"
                >
                    <h3>
                        {{ infoAlbum[0].artist }}
                    </h3>
                </router-link>

                <v-list
                    v-for="(track, index) in infoAlbum[0].trackList"
                    :key="track.songId"
                >
                    <v-list-item @click="$emit('play', track.songPreview)">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ index + 1 }} -
                                {{ track.songTitle }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="3" v-if="user != null">
                <div id="sticky">
                    <v-row justify="space-around" no-gutters>
                        <v-col class="pa-0 ma-1">
                            <v-btn
                                icon
                                @click="toListen(), (loader = 'loading1')"
                                height="85"
                                width="85"
                                :loading="loading1"
                                :disabled="loading1"
                            >
                                <v-icon
                                    size="70"
                                    v-if="daAscoltare.isDaAscoltare"
                                    color="blue"
                                    >mdi-book-remove-multiple</v-icon
                                >
                                <v-icon size="70" v-else color="grey"
                                    >mdi-book-plus-multiple-outline</v-icon
                                >
                            </v-btn>
                            <p
                                class="font-weight-light caption text-center"
                                v-if="daAscoltare.isDaAscoltare"
                            >
                                Rimuovi dagli album da ascoltare
                            </p>
                            <p
                                v-else
                                class="font-weight-light caption text-center"
                            >
                                Aggiungi agli album da ascoltare
                            </p>
                        </v-col>
                        <v-col class="pa-0 ma-1">
                            <v-btn
                                icon
                                @click="listened(), (loader = 'loading2')"
                                height="85"
                                width="85"
                                :loading="loading2"
                                :disabled="loading2"
                            >
                                <v-icon
                                    size="70"
                                    v-if="ascoltato.isAscoltato"
                                    color="green"
                                    >mdi-folder-music</v-icon
                                >
                                <v-icon size="70" v-else color="grey"
                                    >mdi-folder-music-outline</v-icon
                                >
                            </v-btn>
                            <p
                                class="font-weight-light caption text-center"
                                v-if="ascoltato.isAscoltato"
                            >
                                Rimuovi dagli ascoltati
                            </p>
                            <p
                                v-else
                                class="font-weight-light caption text-center"
                            >
                                Aggiungi agli ascoltati
                            </p>
                        </v-col>
                        <v-col class="pa-0 ma-1">
                            <v-btn
                                icon
                                @click="favourite(), (loader = 'loading3')"
                                height="85"
                                width="85"
                                :loading="loading3"
                                :disabled="loading3"
                            >
                                <v-icon
                                    size="70"
                                    color="pink"
                                    v-if="preferito.isPreferito"
                                    >mdi-heart</v-icon
                                >
                                <v-icon color="grey" size="70" v-else
                                    >mdi-heart-outline</v-icon
                                >
                            </v-btn>
                            <p
                                class="font-weight-light caption text-center"
                                v-if="preferito.isPreferito"
                            >
                                Rimuovi dai preferiti
                            </p>
                            <p
                                v-else
                                class="font-weight-light caption text-center"
                            >
                                Aggiungi ai preferiti
                            </p>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <p class="ma-2">Voto:</p>
                    <v-rating
                        class="ma-1"
                        x-large
                        v-model="rating[0]"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        half-increments
                        hover
                    ></v-rating>
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
            user: this.$store.state.user,
            rating: [0],
            preferito: { isPreferito: false },
            ascoltato: { isAscoltato: false },
            daAscoltare: { isDaAscoltare: false },
            loader: null,
            loading1: false,
            loading2: false,
            loading3: false,
        }
    },
    created: function() {
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
            .finally(() => this.checkAdded())
    },
    methods: {
        checkAdded() {
            if (this.user != null) {
                var id = this.$route.params.id
                var ascoltato = this.ascoltato
                var daAscoltare = this.daAscoltare
                var rating = this.rating
                //this.loading = false
                var preferito = this.preferito
                var db = firebase.firestore()
                var userData = db.collection('utenti').doc(this.user.email)
                userData
                    .collection('ascoltati')
                    .doc(id.toString())
                    .get()
                    .then(function(doc) {
                        if (doc.exists) {
                            rating[0] = doc.data().rating
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
                    .then(() => this.caricato())
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
                .then(() => this.trigger('add'))
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
</style>
