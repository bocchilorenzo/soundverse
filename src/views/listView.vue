<template>
    <div>
        <v-container class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row class="ma-2">
                    <v-skeleton-loader ref="skeleton" type="heading" width="50em" class="mx-0"></v-skeleton-loader>
                </v-row>
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 20" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row align="center">
                    <h2 class="ml-5">{{ title }}</h2>
                </v-row>
                <cardContainer :arrayRisultati="arrayRisultatiNew" />
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import cardContainer from '../components/cardcontainer'
export default {
    name: 'listView',
    components: {
        cardContainer,
    },
    data() {
        return {
            arrayRisultatiNew: [],
            title: '',
            bottom: false,
            start: 0,
            end: 40,
            stop: false,
            lastCycle: false,
            loading: true,
        }
    },
    created: function() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.addAlbums()
    },
    methods: {
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        checkDuplicati(albumId) {
            var trovato = false
            for (var j = 0; j < this.arrayRisultatiNew.length; j++) {
                if (this.arrayRisultatiNew != null) {
                    if (this.arrayRisultatiNew[j] != undefined) {
                        if (this.arrayRisultatiNew[j].albumId == albumId) {
                            trovato = true
                        }
                    }
                }
            }
            return trovato
        },
        addAlbums() {
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/playlist/' +
                        this.$route.params.lista +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var i = 0
                        var tmp = false
                        if (this.title == '') {
                            this.title = response.data.title
                        }
                        for (i = this.start; i < this.end; i++) {
                            var album = {
                                id: i,
                                title: response.data.tracks.data[i].album['title'],
                                cover: response.data.tracks.data[i].album['cover_medium'],
                                artist: response.data.tracks.data[i].artist['name'],
                                albumId: response.data.tracks.data[i].album['id'],
                                albumLink:
                                    'https://deezer.com/album/' +
                                    response.data.tracks.data[i].album['id'], //questo non servirà poi, è solo per testare ora
                            }
                            tmp = this.checkDuplicati(album.albumId)
                            if (tmp == false) {
                                this.arrayRisultatiNew.push(album)
                            }
                        }
                        this.start = this.end
                        if (this.lastCycle == true) {
                            this.stop = true
                        } else {
                            if (response.data.nb_tracks > this.end + 40) {
                                this.end += 40
                            } else {
                                this.end = response.data.nb_tracks - 1
                                this.lastCycle = true
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => (this.loading = false))
            }
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.addAlbums()
            }
        },
    },
}
</script>
