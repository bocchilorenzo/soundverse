<template>
    <div>
        <div v-if="albums == null">
            <v-row align="center" justify="center">
                <v-col
                    v-if="this.loading"
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
                        <p>{{ artisti }}</p>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import cardContainer from '../components/cardcontainer'
import axios from 'axios'
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
            path: this.$route.params.q,
        }
    },
    created: function() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        window.addEventListener('scroll', () => {
            this.path = this.$route.params.q
        })
        this.updateInfoArtisti()
        this.updateInfoAlbum()
        if (this.loading == true) {
            this.$store.commit('toggleLoading')
        }
    },
    components: {
        cardContainer,
    },
    props: {
        albumSearch: Array,
        artistsSearch: Array,
    },
    methods: {
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        updateInfoArtisti() {
            var q = this.$route.params.q
            axios
                .get(`https://api.deezer.com/search/artist?q=` + q)
                .then(response => {
                    for (var x = 0; x < 12; x++) {
                        if (response.data.data[x] != undefined) {
                            var risultati2 = {
                                id: x,
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
        },
        updateInfoAlbum() {
            var q = this.$route.params.q
            if (this.stop == false) {
                axios
                    .get(
                        'https://api.deezer.com/search/album?q=' +
                            q +
                            '&index=' +
                            this.start
                    )
                    .then(response => {
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var risultati = {
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
                                this.albums.push(risultati)
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
            }
        },
        resetAll(){
            this.albums = []
            this.artisti = []
            this.bottom = false
            this.start = 0
            this.end = 25
            this.stop = false
            this.lastCycle = false
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.updateInfoAlbum()
            }
        },
        path: function() {
            this.resetAll()
            this.updateInfoAlbum()
            this.updateInfoArtisti()
        },
    },
}
</script>
