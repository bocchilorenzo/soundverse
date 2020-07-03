<template>
    <v-container class="fill-width" fluid>
        <div v-if="this.loading">
            <div v-for="x in 3" :key="x">
                <v-row class="ma-2">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="heading"
                        width="50em"
                        class="mx-0"
                    ></v-skeleton-loader>
                </v-row>
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 6" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row class="ma-2">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="button"
                        class="mx-0"
                    ></v-skeleton-loader>
                </v-row>
                <br />
                <br />
            </div>
        </div>
        <div v-else>
            <!--Aggiungere le nuove uscite-->
            <h2 class="ma-2">{{ worldAlbumArray[0] }}</h2>
            <carousel :albumArray="worldAlbumArray" :inizio="2" :fine="8" v-on:login="snackMsg" />
            <div class="my-2">
                <v-btn
                    text
                    color="primary"
                    @click="visualizzaLista(worldAlbumArray)"
                    name="Visualizza tutti World"
                    >Visualizza tutti</v-btn
                >
            </div>
            <br />
            <h2 class="ma-2">{{ italyAlbumArray[0] }}</h2>
            <carousel :albumArray="italyAlbumArray" :inizio="2" :fine="8" v-on:login="snackMsg" />
            <div class="my-2">
                <v-btn
                    text
                    color="primary"
                    @click="visualizzaLista(italyAlbumArray)"
                    name="Visualizza tutti Italy"
                    >Visualizza tutti</v-btn
                >
            </div>
            <br />
            <h2 class="ma-2">{{ hitsArray[0] }}</h2>
            <carousel :albumArray="hitsArray" :inizio="2" :fine="8" v-on:login="snackMsg" />
            <div class="my-2">
                <v-btn
                    text
                    color="primary"
                    @click="visualizzaLista(hitsArray)"
                    name="Visualizza tutti Hits"
                    >Visualizza tutti</v-btn
                >
            </div>
            <br />
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import carousel from '../components/carousel'

export default {
    name: 'Home',
    components: { carousel },
    data() {
        return {
            worldAlbumArray: [],
            italyAlbumArray: [],
            hitsArray: [],
            loading: true,
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'home')
        this.$emit('brand', 'Home')
        this.scrollToTop()
        this.prelevaAlbum()
    },
    methods: {
        //Preleva gli album dalle API
        prelevaAlbum() {
            if (
                this.worldAlbumArray[0] == undefined &&
                this.italyAlbumArray[0] == undefined &&
                this.hitsArray[0] == undefined
            ) {
                axios
                    .all([
                        axios({
                            url: 'https://api.deezer.com/playlist/3155776842?output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url: 'https://api.deezer.com/playlist/1116187241?output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url: 'https://api.deezer.com/playlist/65489479?output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                    ])
                    .then(
                        axios.spread((firstResponse, secondResponse, thirdResponse) => {
                            this.worldAlbumArray.push(firstResponse.data.title)
                            this.worldAlbumArray.push('3155776842')
                            var tmp1 = false
                            var i = 0
                            for (i = 0; i < 25; i++) {
                                var albumWorld = {
                                    id: i,
                                    title: firstResponse.data.tracks.data[i].album['title'],
                                    cover: firstResponse.data.tracks.data[i].album['cover_medium'],
                                    artist: firstResponse.data.tracks.data[i].artist['name'],
                                    albumId: firstResponse.data.tracks.data[i].album['id'],
                                }
                                tmp1 = this.checkDuplicati('world', albumWorld.albumId)
                                if (tmp1 == false) {
                                    this.worldAlbumArray.push(albumWorld)
                                }
                            }
                            this.italyAlbumArray.push(secondResponse.data.title)
                            this.italyAlbumArray.push('1116187241')
                            var tmp2 = false
                            var x = 0
                            for (x = 0; x < 25; x++) {
                                var albumItaly = {
                                    id: x,
                                    title: secondResponse.data.tracks.data[x].album['title'],
                                    cover: secondResponse.data.tracks.data[x].album['cover_medium'],
                                    artist: secondResponse.data.tracks.data[x].artist['name'],
                                    albumId: secondResponse.data.tracks.data[x].album['id'],
                                }
                                tmp2 = this.checkDuplicati('italy', albumItaly.albumId)
                                if (tmp2 == false) {
                                    this.italyAlbumArray.push(albumItaly)
                                }
                            }
                            this.hitsArray.push('Album delle ' + thirdResponse.data.title)
                            this.hitsArray.push('65489479')
                            var tmp3 = false
                            var y = 0
                            for (y = 0; y < 25; y++) {
                                var albumHits = {
                                    id: y,
                                    title: thirdResponse.data.tracks.data[y].album['title'],
                                    cover: thirdResponse.data.tracks.data[y].album['cover_medium'],
                                    artist: thirdResponse.data.tracks.data[y].artist['name'],
                                    albumId: thirdResponse.data.tracks.data[y].album['id'],
                                }
                                tmp3 = this.checkDuplicati('hits', albumHits.albumId)
                                if (tmp3 == false) {
                                    this.hitsArray.push(albumHits)
                                }
                            }
                        })
                    )
                    .catch(error => console.log(error))
                    .finally(() => (this.loading = false))
            }
        },
        //Ricolloca lo scrolling all'inizio
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        //Effettua il routing per la visualizzazione della lista
        visualizzaLista(arrayAlbum) {
            this.$router.push({
                name: 'list',
                params: { type: 'playlist', lista: arrayAlbum[1] },
            })
        },
        //Controlla se nell'array ci sono duplicati di un certo album
        checkDuplicati(type, albumId) {
            var trovato = false
            var arr = Array
            if (type == 'world') {
                arr = this.worldAlbumArray
            } else if (type == 'italy') {
                arr = this.italyAlbumArray
            } else {
                arr = this.hitsArray
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr != null) {
                    if (arr[j] != undefined) {
                        if (arr[j].albumId == albumId) {
                            trovato = true
                        }
                    }
                }
            }
            return trovato
        },
        snackMsg(msg) {
            this.$emit('login', msg)
        },
    },
    inject: ['theme'],
}
</script>
