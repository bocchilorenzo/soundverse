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
                                <v-img
                                    class="align-end"
                                    :src="infoAlbum[0].cover"
                                    width="100%"
                                ></v-img>
                                <p
                                    class="text-left font-weight-normal"
                                    display="inline-block"
                                >Artista: {{ infoAlbum[0].artist }}</p>
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
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'albumInformation',
    data() {
        return {
            infoAlbum: [],
        }
    },
    created: function() {
        this.$store.commit('toggleLoading')
        var id = this.$route.params.id
        axios
            .get('https://api.deezer.com/album/' + id)
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
                if (this.loading == true) {
                    this.$store.commit('toggleLoading')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>
