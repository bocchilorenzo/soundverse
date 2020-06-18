<template>
    <div class="home">
        <v-container class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row class="ma-2">
                    <v-skeleton-loader ref="skeleton" type="heading" width="50em" class="mx-0"></v-skeleton-loader>
                </v-row>
                <br />
                <div v-for="x in 3" :key="x">
                    <v-row class="ma-2">
                        <v-skeleton-loader ref="skeleton" type="heading" width="50em" class="mx-0"></v-skeleton-loader>
                    </v-row>
                    <v-row align="center" no-gutters>
                        <v-col
                            v-for="n in 10"
                            :key="n"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader type="card" style="margin: 0 auto" max-width="220"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                    <v-row class="ma-2">
                        <v-skeleton-loader ref="skeleton" type="button" class="mx-0"></v-skeleton-loader>
                    </v-row>
                    <br />
                    <br />
                </div>
            </div>
            <div v-else>
                <h1 class="ma-2">{{ nomeGenere }}</h1>
                <h2 class="ma-2">Top 10</h2>
                <carousel :albumArray="classifica" :inizio="0" :fine="10" />
                <br />
                <h2 class="ma-2">Ultime uscite</h2>
                <carousel :albumArray="uscite" :inizio="0" :fine="10" />
                <div class="my-2">
                    <v-btn text color="primary" @click="visualizzaLista(id)">Visualizza tutti</v-btn>
                </div>
                <br />
                <h2 class="ma-2">Selezione Deezer</h2>
                <carousel :albumArray="selezione" :inizio="0" :fine="10" />
                <br />
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import carousel from '../components/carousel'

export default {
    name: 'genere',
    components: { carousel },
    data() {
        return {
            selezione: [],
            classifica: [],
            uscite: [],
            nomeGenere: '',
            loading: true,
            id: this.$route.params.id,
        }
    },
    created: function() {
        this.scrollToTop()
        this.addAlbums()
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        visualizzaLista(id) {
            this.$router.push({
                name: 'list',
                params: { type: 'new', lista: id },
            })
        },
        addAlbums() {
            axios
                .all([
                    axios({
                        url: 'https://api.deezer.com/editorial/' + this.id + '&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/editorial/' +
                            this.id +
                            '/selection&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url: 'https://api.deezer.com/editorial/' + this.id + '/charts&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                    axios({
                        url:
                            'https://api.deezer.com/editorial/' +
                            this.id +
                            '/releases&output=jsonp',
                        adapter: jsonpAdapter,
                    }),
                ])
                .then(
                    axios.spread((firstResponse, secondResponse, thirdResponse, fourthResponse) => {
                        this.nomeGenere = firstResponse.data.name
                        var i = 0
                        for (i = 0; i < 10; i++) {
                            if (secondResponse.data.data[i] != undefined) {
                                var albumSelection = {
                                    id: i,
                                    title: secondResponse.data.data[i].title,
                                    cover: secondResponse.data.data[i].cover_medium,
                                    artist: secondResponse.data.data[i].artist['name'],
                                    albumId: secondResponse.data.data[i].id,
                                    albumLink:
                                        'https://deezer.com/album/' +
                                        secondResponse.data.data[i].id,
                                }
                                this.selezione.push(albumSelection)
                            }
                        }
                        var x = 0
                        for (x = 0; x < 10; x++) {
                            if (thirdResponse.data.albums.data[x] != undefined) {
                                var albumChart = {
                                    id: x,
                                    title: thirdResponse.data.albums.data[x].title,
                                    cover: thirdResponse.data.albums.data[x].cover_medium,
                                    artist: thirdResponse.data.albums.data[x].artist['name'],
                                    albumId: thirdResponse.data.albums.data[x].id,
                                    albumLink:
                                        'https://deezer.com/album/' +
                                        thirdResponse.data.albums.data[x].id,
                                }
                                this.classifica.push(albumChart)
                            }
                        }
                        var y = 0
                        for (y = 0; y < 10; y++) {
                            if (fourthResponse.data.data[y] != undefined) {
                                var albumUscite = {
                                    id: i,
                                    title: fourthResponse.data.data[y].title,
                                    cover: fourthResponse.data.data[y].cover_medium,
                                    artist: fourthResponse.data.data[y].artist['name'],
                                    albumId: fourthResponse.data.data[y].id,
                                    albumLink:
                                        'https://deezer.com/album/' +
                                        fourthResponse.data.data[y].id,
                                }
                                this.uscite.push(albumUscite)
                            }
                        }
                    })
                )
                .catch(error => {
                    console.log(error)
                })
                .finally(() => (this.loading = false))
        },
    },
}
</script>
