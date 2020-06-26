<template>
    <v-row align="center" no-gutters class="pt-3">
        <v-col
            v-for="album in albumArray"
            :key="album.albumId"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            class="pb-3 px-1 col-6"
        >
            <albumCard :albumArray="album" :id="album.albumId" v-on:deletThis="rimuoviElemento" />
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

export default {
    name: 'cardContainerProva',
    props: { idArray: Array },
    components: { albumCard },
    data() {
        return {
            albumArray: [],
            loading: true,
            bottom: false,
            start: 0,
            end: 30,
            stop: false,
            lastCycle: false,
        }
    },
    created: function() {
        this.scrollToTop()
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.addAlbums()
    },
    methods: {
        rimuoviElemento(id) {
            var i = 0
            while (i < this.albumArray.length) {
                if (this.albumArray[i].albumId == id) {
                    this.albumArray.splice(i, i + 1)
                    i = 0
                    if (this.albumArray.length == 0) {
                        this.vuoto.push({ vero: true })
                    }
                } else {
                    i++
                }
            }
            var x = 0
            while (i < this.idArray.length) {
                if (this.idArray[x].albumId == id) {
                    this.idArray.splice(x, x + 1)
                    x = 0
                } else {
                    x++
                }
            }
        },
        addAlbums() {
            if (this.stop == false) {
                for (var i = this.start; i < this.end; i++) {
                    if (this.idArray[i].albumId != undefined) {
                        axios({
                            url:
                                'https://api.deezer.com/album/' +
                                this.idArray[i].albumId +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        })
                            .then(response => {
                                var album = {
                                    id: i,
                                    title: response.data.title,
                                    cover: response.data.cover_medium,
                                    artist: response.data.artist.name,
                                    albumId: response.data.id,
                                    albumLink: response.data.link, //questo non servirà poi, è solo per testare ora
                                }
                                this.albumArray.push(album)
                                this.start = this.end
                                if (this.lastCycle == true) {
                                    this.stop = true
                                } else {
                                    if (this.idArray.length > this.end + 30) {
                                        this.end += 30
                                    } else {
                                        this.end = this.idArray.length - 1
                                        this.lastCycle = true
                                    }
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            .finally(() => (this.loading = false))
                    }
                }
            } else {
                this.loading = false
            }
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        scrollToTop() {
            window.scrollTo(0, 0)
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

<style></style>
