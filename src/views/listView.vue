<template>
    <v-container class="fill-height" fluid>
        <v-row align="center">
            <h2 class="ml-5">{{ title }}</h2>
        </v-row>
        <v-row align="center" justify="center">
            <v-col
                v-if="arrayRisultatiNew.length == 0"
                cols="1"
                class="text-center"
                style="height: 100vh; display: flex; align-items:center;"
            >
                <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
            </v-col>
            <v-col
                v-else
                v-for="album in arrayRisultatiNew"
                :key="album.id"
                cols="12"
                sm="3"
                lg="2"
                xl="2"
            >
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
</template>

<script>
import axios from 'axios'
import albumCard from '../components/card'
export default {
    name: 'listView',
    components: {
        albumCard,
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
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        checkDuplicati(i, albumId) {
            var trovato = false
            for (var j = 0; j < i; j++) {
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
                axios
                    .get(
                        'https://api.deezer.com/playlist/' +
                            this.$route.params.lista
                    )
                    .then(response => {
                        var i = 0
                        var tmp = false
                        if (this.title == '') {
                            this.title = response.data.title
                        }
                        for (i = this.start; i < this.end; i++) {
                            var album = {
                                id: i,
                                title:
                                    response.data.tracks.data[i].album['title'],
                                cover:
                                    response.data.tracks.data[i].album[
                                        'cover_medium'
                                    ],
                                artist:
                                    response.data.tracks.data[i].artist['name'],
                                albumId:
                                    response.data.tracks.data[i].album['id'],
                                albumLink:
                                    'https://deezer.com/album/' +
                                    response.data.tracks.data[i].album['id'], //questo non servirà poi, è solo per testare ora
                            }
                            tmp = this.checkDuplicati(i, album.albumId)
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
