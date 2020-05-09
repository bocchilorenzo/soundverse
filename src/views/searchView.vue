<template>
    <div>
        <div v-if="loading == true">
            <v-row align="center" justify="center">
                <v-col
                    cols="1"
                    class="text-center"
                    style="height: 100vh; display: flex; align-items:center;"
                >
                    <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <v-tabs
                v-model="tab"
                background-color="indigo"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab>Album</v-tab>
                <v-tab>Artisti</v-tab>
                <v-tab-item>
                    <v-card flat tile>
                        <cardContainer :arrayRisultati="albums"></cardContainer>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat tile>
                        <cardContainerArtisti :arrayRisultati="artisti"></cardContainerArtisti>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import cardContainer from '../components/cardcontainer'
import cardContainerArtisti from '../components/cardcontainerartisti'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
export default {
    name: 'search',
    data() {
        return {
            tab: null,
            centered: true,
            grow: true,
            albums: [],
            artisti: [],
            bottom: false,
            start: 0,
            end: 25,
            stop: false,
            lastCycle: false,
            loading: true
        }
    },
    created: function() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtisti()
    },
    components: {
        cardContainer,
        cardContainerArtisti,
    },
    methods: {
        checkDuplicati(albumId) {
            var trovato = false
            for (var j = 0; j < this.albums.length; j++) {
                if (this.albums != null) {
                    if (this.albums[j] != undefined) {
                        if (this.albums[j].albumId == albumId) {
                            trovato = true
                        }
                    }
                }
            }
            return trovato
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        updateInfoArtisti() {
            var q = this.$route.params.q
            axios({
                url:
                    'https://api.deezer.com/search/artist?q=' +
                    q +
                    '&output=jsonp',
                adapter: jsonpAdapter,
            })
                .then(response => {
                    for (var x = 0; x < 12; x++) {
                        if (response.data.data[x] != undefined) {
                            var risultati2 = {
                                artistId: response.data.data[x].id,
                                name: response.data.data[x].name,
                                artistImage:
                                    response.data.data[x].picture_medium,
                            }
                            this.artisti.push(risultati2)
                        }
                    }
                })
                .catch(error => console.log(error))
                .finally(() => (this.updateInfoAlbum()))
        },
        updateInfoAlbum() {
            var q = this.$route.params.q
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/search/album?q=' +
                        q +
                        '&index=' +
                        this.start +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var tmp = false
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var risultati = {
                                    id: i,
                                    title: response.data.data[i]['title'],
                                    cover:
                                        response.data.data[i]['cover_medium'],
                                    artist:
                                        response.data.data[i].artist['name'],
                                    albumId: response.data.data[i]['id'],
                                    albumLink: response.data.data[i]['link'], //questo non servirà poi, è solo per testare ora
                                    explicit:
                                        response.data.data[i][
                                            'explicit_lyrics'
                                        ],
                                }
                                tmp = this.checkDuplicati(risultati.albumId)
                                if (tmp == false) {
                                    this.albums.push(risultati)
                                }
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
