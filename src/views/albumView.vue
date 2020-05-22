<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col
                        v-if="this.loading"
                        cols="1"
                        class="text-center"
                        style="height: 100vh; display: flex; align-items:center;"
                    >
                        <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
                    </v-col>
                    <v-col v-else cols="12" sm="8" md="4">
                        <!--mettere un v-if che se è undefined mostra "album non esistente", altrimenti mostra i dati dell'album-->
                        <!--dividere in un componente separato-->
                        <v-card v-if="infoAlbum[0] != undefined" class="elevation-12">
                            <v-card-text>
                                <p
                                    class="text-center font-weight-bold"
                                    display="inline-block"
                                >{{ infoAlbum[0].title }}</p>
                                <v-img class="align-end" :src="infoAlbum[0].cover" width="100%"></v-img>
                                <router-link
                                    :to="{
                                        name: 'artist',
                                        path: '/artist/:artista',
                                        params: {
                                            artista: infoAlbum[0].artistId,
                                        },
                                    }"
                                >
                                    <p
                                        class="text-left font-weight-normal"
                                        display="inline-block"
                                    >Artista: {{ infoAlbum[0].artist }}</p>
                                </router-link>
                                <p
                                    class="text-left font-weight-normal"
                                    display="inline-block"
                                >Genere: {{ infoAlbum[0].genre }}</p>
                                <p class="text-left font-weight-normal" display="inline-block">
                                    Numero tracce:
                                    {{ infoAlbum[0].numberOfTracks }}
                                </p>
                                <p
                                    v-if="infoAlbum[0].explicit"
                                    class="text-left font-weight-normal"
                                    display="inline-block"
                                >Esplicito</p>
                                <p
                                    class="text-left font-weight-normal"
                                    display="inline-block"
                                >Data uscita: {{ infoAlbum[0].releaseDate }}</p>
                                <p
                                    class="text-left font-weight-normal"
                                    display="inline-block"
                                >Tracklist:</p>

                                <v-list
                                    v-for="(track, index) in infoAlbum[0]
                                        .trackList"
                                    :key="track.songId"
                                >
                                    <v-list-item
                                        @click="
                                            $emit('play', track.songPreview)
                                        "
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ index + 1 }} -
                                                {{ track.songTitle }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                        <div v-if="added[0].aggiunto == 1" class="my-2">
                            <v-btn
                                depressed
                                color="primary"
                                @click="aggiungi()"
                            >Aggiungi agli album ascoltati</v-btn>
                        </div>
                        <div v-else-if="added[0].aggiunto == 2" class="my-2">
                            <v-btn depressed loading color="primary"></v-btn>
                        </div>
                        <div v-else-if="added[0].aggiunto == 3" class="my-2">
                            <v-btn
                                depressed
                                color="primary"
                                @click="rimuovi()"
                            >Rimuovi dagli album ascoltati</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
export default {
    name: 'albumInformation',
    data() {
        return {
            infoAlbum: [],
            loading: true,
            user: this.$store.state.user,
            added: [{ aggiunto: 0 }], //0 vuol dire che l'utente non è loggato, 1 che non lo ha aggiunto, 2 che lo ha aggiunto
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
            this.loading = false
            if (this.user != null) {
                var db = firebase.firestore()
                var trovato = db.collection('ascoltati')
                var agg = this.added
                trovato
                    .where('mail', '==', this.user.email)
                    .where('idAlbum', '==', this.$route.params.id)
                    .get()
                    .then(function(querySnapshot) {
                        agg[0].aggiunto = 1
                        if (querySnapshot.empty == false) {
                            agg[0].aggiunto = 3
                        }
                    })
                    .catch(function(error) {
                        console.log(
                            'Impossibile recuperare i documenti: ',
                            error
                        )
                    })
            }
        },
        aggiungi() {
            var id = this.$route.params.id
            var email = this.user.email
            var title = this.infoAlbum[0].title
            var db = firebase.firestore()
            var ascoltatiColl = db.collection('ascoltati')
            ascoltatiColl
                .doc()
                .set({
                    idAlbum: id,
                    mail: email,
                    titolo: title,
                })
                .then(() => this.trigger('add'))
        },
        rimuovi() {
            var db = firebase.firestore()
            var ascoltatiColl = db.collection('ascoltati')
            var docId = ''
            ascoltatiColl
                .where('mail', '==', this.user.email)
                .where('idAlbum', '==', this.$route.params.id)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        docId += doc.id
                    })
                })
                .then(function(){
                    ascoltatiColl.doc(docId).delete()
                })
                .then(() => this.trigger('rm'))
        },
        trigger(mode) {
            if (mode == 'add') {
                this.added[0].aggiunto = 2
                setTimeout(() => (this.added[0].aggiunto = 3), 1000)
            } else {
                this.added[0].aggiunto = 2
                setTimeout(() => (this.added[0].aggiunto = 1), 1000)
            }
        },
    },
}
</script>
