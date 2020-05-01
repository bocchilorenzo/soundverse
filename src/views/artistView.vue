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
                        <v-card v-if="artistInfo[0] != undefined" class="elevation-12">
                            <v-card-text>
                                <p
                                    class="text-center font-weight-bold"
                                    display="inline-block"
                                >{{ artistInfo[0].name }}</p>
                                <v-img class="align-end" :src="artistInfo[0].picture" width="100%"></v-img>
                                <p class="text-left font-weight-normal" display="inline-block">
                                    Numero album:
                                    {{ artistInfo[0].albumNumber }}
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col v-for="album in albums" :key="album.id" cols="12" sm="3" lg="2" xl="2">
                        <router-link
                            :to="{
                        name: 'album',
                        path: '/album/:id',
                        params: { id: album.albumId },
                        props: true,
                    }"
                        >
                            <albumCard :albumArray="album" :id="album.albumId" />
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
import albumCard from '../components/card'
export default {
    name: 'artistView',
    data() {
        return {
            artistInfo: [],
            albums: [],
            id: '',
            bottom: false,
            start: 0,
            end: 25,
            stop: false,
            lastCycle: false,
        }
    },
    components: {
        albumCard,
    },
    created: function() {
        this.id = this.$route.params.artista
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtista()
        this.updateInfoAlbum()
        if (this.loading == true) {
            this.$store.commit('toggleLoading')
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
    methods: {
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        updateInfoArtista() {
            if (this.stop == false) {
                axios
                    .get('https://api.deezer.com/artist/' + this.id)
                    .then(response => {
                        var artistData = {
                            name: response.data.name,
                            picture: response.data.picture_medium,
                            albumNumber: response.data.nb_album,
                        }
                        this.artistInfo.push(artistData)
                    })
                    .catch(error => console.log(error))
            }
        },
        updateInfoAlbum() {
            if (this.stop == false) {
                axios
                    .get(
                        'https://api.deezer.com/artist/' +
                            this.id +
                            '/albums?index=' +
                            this.start
                    )
                    .then(response => {
                        for (var i = this.start; i < this.end; i++) {
                            if (response.data.data[i] != undefined) {
                                var albumsData = {
                                    id: i,
                                    title: response.data.data[i].title,
                                    cover: response.data.data[i].cover_medium,
                                    artist: this.artistInfo.name,
                                    albumId: response.data.data[i].id,
                                    albumLink: response.data.data[i].link, //questo non servirà poi, è solo per testare ora
                                }
                                this.albums.push(albumsData)
                            }
                        }
                        this.start = this.end
                        if (this.lastCycle == true) {
                            this.stop = true
                        } else {
                            if (response.data.total > this.end + 25) {
                                this.end += 25
                            } else {
                                this.end = response.data.total - 1
                                this.lastCycle = true
                            }
                        }
                        console.log(response.data.total)
                    })
                    .catch(error => console.log(error))
            }
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.updateInfoAlbum()
            }
        },
    },
}
</script>
