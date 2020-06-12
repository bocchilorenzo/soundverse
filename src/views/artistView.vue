<template>
    <v-app id="inspire">
        <v-content class="pa-0">
            <v-container class="fill-height" fluid>
                <v-row v-if="this.loading" align="center" justify="center">
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
                <v-row v-else>
                    <v-col cols="2">
                        <v-row id="sticky">
                            <v-img
                                class="align-end"
                                :src="artistInfo[0].picture"
                                contain
                                style="width:200px"
                            ></v-img>
                            <h1 display="inline-block">
                                {{ artistInfo[0].name }}
                            </h1>
                            <p display="inline-block">
                                Numero album:
                                {{ artistInfo[0].albumNumber }}
                            </p>
                        </v-row>
                    </v-col>
                    <v-col cols="8">
                        <v-row align="center">
                            <v-col
                                v-for="album in albums"
                                :key="album.albumId"
                                cols="12"
                                sm="4"
                                lg="3"
                                xl="2"
                            >
                                <v-row justify="center">
                                    <albumCard
                                        :albumArray="album"
                                        :id="album.albumId"
                                    />
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" v-if="caricatiSimili == true">
                        <v-row no-gutters justify="center">
                            <v-col
                                v-for="artista in simili"
                                :key="artista.artistId"
                            >
                                <router-link
                                    :to="{
                                        name: 'artist',
                                        path: '/artist/:artista',
                                        params: { artista: artista.artistId },
                                        props: true,
                                    }"
                                >
                                    <artistCard
                                        :artistArray="artista"
                                        :id="artista.artistId"
                                    />
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
/*import cardContainerArtisti from '../components/cardcontainerartisti'*/
import artistCard from '../components/cardArtisti'
import albumCard from '../components/card'
/*import cardContainer from '../components/cardcontainer.vue'*/
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
            loading: true,
            simili: [],
            caricatiSimili: false,
        }
    },
    components: {
        artistCard,
        albumCard,
    },
    created: function() {
        this.id = this.$route.params.artista
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtista()
    },
    methods: {
        aggiorna() {
            this.id = this.$route.params.artista
            this.updateInfoArtista()
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        updateInfoArtista() {
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/artist/' +
                        this.id +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var artistData = {
                            name: response.data.name,
                            picture: response.data.picture_big,
                            albumNumber: response.data.nb_album,
                        }
                        this.artistInfo.push(artistData)
                        var nome = this.artistInfo[0].name
                        nome = encodeURIComponent(nome.trim())
                        axios
                            .get(
                                'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' +
                                    nome +
                                    '&api_key=008dd2405a84da9505c1b2dd4dffd5e4&format=json'
                            )
                            .then(response => {
                                for (var i = 0; i < 5; i++) {
                                    var artistData2 = {
                                        name:
                                            response.data.artist.similar.artist[
                                                i
                                            ].name,
                                    }
                                    this.simili.push(artistData2)
                                }
                            })
                            .catch(error => console.log(error))
                            .finally(() => this.updateSimili())
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.updateInfoAlbum())
            }
        },
        updateSimili() {
            axios
                .all([
                    axios({
                        url:
                            'https://api.deezer.com/search/artist?q=' +
                            this.simili[0].name +
                            '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/search/artist?q=' +
                            this.simili[1].name +
                            '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/search/artist?q=' +
                            this.simili[2].name +
                            '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/search/artist?q=' +
                            this.simili[3].name +
                            '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/search/artist?q=' +
                            this.simili[4].name +
                            '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                ])
                .then(
                    axios.spread(
                        (
                            firstResponse,
                            secondResponse,
                            thirdResponse,
                            fourthResponse,
                            fifthResponse
                        ) => {
                            for (let h = 0; h < 25; h++) {
                                if (firstResponse.data.data[h] != undefined) {
                                    if (
                                        this.simili[0].name.toUpperCase() ==
                                        firstResponse.data.data[
                                            h
                                        ].name.toUpperCase()
                                    ) {
                                        this.simili[0].artistId =
                                            firstResponse.data.data[h].id
                                        this.simili[0].artistImage =
                                            firstResponse.data.data[
                                                h
                                            ].picture_medium
                                        break
                                    }
                                }
                            }
                            for (let h = 0; h < 25; h++) {
                                if (secondResponse.data.data[h] != undefined) {
                                    if (
                                        this.simili[1].name.toUpperCase() ==
                                        secondResponse.data.data[
                                            h
                                        ].name.toUpperCase()
                                    ) {
                                        this.simili[1].artistId =
                                            secondResponse.data.data[h].id
                                        this.simili[1].artistImage =
                                            secondResponse.data.data[
                                                h
                                            ].picture_medium
                                        break
                                    }
                                }
                            }
                            for (let h = 0; h < 25; h++) {
                                if (thirdResponse.data.data[h] != undefined) {
                                    if (
                                        this.simili[2].name.toUpperCase() ==
                                        thirdResponse.data.data[
                                            h
                                        ].name.toUpperCase()
                                    ) {
                                        this.simili[2].artistId =
                                            thirdResponse.data.data[h].id
                                        this.simili[2].artistImage =
                                            thirdResponse.data.data[
                                                h
                                            ].picture_medium
                                        break
                                    }
                                }
                            }
                            for (let h = 0; h < 25; h++) {
                                if (fourthResponse.data.data[h] != undefined) {
                                    if (
                                        this.simili[3].name.toUpperCase() ==
                                        fourthResponse.data.data[
                                            h
                                        ].name.toUpperCase()
                                    ) {
                                        this.simili[3].artistId =
                                            fourthResponse.data.data[h].id
                                        this.simili[3].artistImage =
                                            fourthResponse.data.data[
                                                h
                                            ].picture_medium
                                        break
                                    }
                                }
                            }
                            for (let h = 0; h < 25; h++) {
                                if (fifthResponse.data.data[h] != undefined) {
                                    if (
                                        this.simili[4].name.toUpperCase() ==
                                        fifthResponse.data.data[
                                            h
                                        ].name.toUpperCase()
                                    ) {
                                        this.simili[4].artistId =
                                            fifthResponse.data.data[h].id
                                        this.simili[4].artistImage =
                                            fifthResponse.data.data[
                                                h
                                            ].picture_medium
                                        break
                                    }
                                }
                            }
                        }
                    )
                )
                .catch(error => console.log(error))
                .finally(() => (this.caricatiSimili = true))
        },
        updateInfoAlbum() {
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/artist/' +
                        this.id +
                        '/albums?index=' +
                        this.start +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var albumsData = {
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
                    })
                    .catch(error => console.log(error))
                    .finally(() => (this.loading = false))
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
<style scoped>
#sticky {
    position: sticky;
    top: 64px;
}
</style>
