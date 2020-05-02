<template>
    <div class="home">
        <v-container class="fill-width" fluid>
            <div v-if="this.loading">
                <v-sheet class="mx-auto my-2 px-3 pt-3 pb-3" cols="12" max-width="1500px">
                    <h2 class="ma-2">Top Worldwide</h2>
                    <v-slide-group class="pa-0">
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
                <v-sheet class="mx-auto my-2 px-3 pt-3 pb-3" cols="12" max-width="1500px">
                    <h2 class="ma-2">Top Italy</h2>
                    <v-slide-group class="pa-0">
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                        <v-slide-item>
                            <v-skeleton-loader class="mx-3" width="200" type="card"></v-skeleton-loader>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <div v-else>
                <carousel :albumArray="worldAlbumArray" v-on:updateLista="prop" />
                <carousel :albumArray="italyAlbumArray" v-on:updateLista="prop" />
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import carousel from '../components/carousel'

// @ is an alias to /src

export default {
    name: 'Home',
    components: { carousel },
    data() {
        return {
            //albumArray: [],
            worldAlbumArray: [],
            italyAlbumArray: [],
        }
    },
    created: function() {
        this.$vuetify.theme.dark = false
        if (
            this.worldAlbumArray[0] == undefined &&
            this.italyAlbumArray[0] == undefined
        ) {
            axios
                .all([
                    axios.get(`https://api.deezer.com/playlist/3155776842`),
                    axios.get(`https://api.deezer.com/playlist/1116187241`),
                ])
                .then(
                    axios.spread((firstResponse, secondResponse) => {
                        this.worldAlbumArray.push(firstResponse.data.title)
                        this.worldAlbumArray.push('3155776842')
                        var tmp1 = false
                        var i = 0
                        for (i = 0; i < 25; i++) {
                            var albumWorld = {
                                id: i,
                                title:
                                    firstResponse.data.tracks.data[i].album[
                                        'title'
                                    ],
                                cover:
                                    firstResponse.data.tracks.data[i].album[
                                        'cover_medium'
                                    ],
                                artist:
                                    firstResponse.data.tracks.data[i].artist[
                                        'name'
                                    ],
                                albumId:
                                    firstResponse.data.tracks.data[i].album[
                                        'id'
                                    ],
                                albumLink:
                                    'https://deezer.com/album/' +
                                    firstResponse.data.tracks.data[i].album[
                                        'id'
                                    ], //questo non servirà poi, è solo per testare ora
                            }
                            tmp1 = this.checkDuplicati(
                                'world',
                                i,
                                albumWorld.albumId
                            )
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
                                title:
                                    secondResponse.data.tracks.data[x].album[
                                        'title'
                                    ],
                                cover:
                                    secondResponse.data.tracks.data[x].album[
                                        'cover_medium'
                                    ],
                                artist:
                                    secondResponse.data.tracks.data[x].artist[
                                        'name'
                                    ],
                                albumId:
                                    secondResponse.data.tracks.data[x].album[
                                        'id'
                                    ],
                                albumLink:
                                    'https://deezer.com/album/' +
                                    secondResponse.data.tracks.data[x].album[
                                        'id'
                                    ], //questo non servirà poi, è solo per testare ora
                            }
                            tmp2 = this.checkDuplicati(
                                'italy',
                                x,
                                albumItaly.albumId
                            )
                            if (tmp2 == false) {
                                this.italyAlbumArray.push(albumItaly)
                            }
                        }
                        this.$store.commit('toggleLoading')
                        if (this.loading == true) {
                            this.$store.commit('toggleLoading')
                        }
                    })
                )
                .catch(error => console.log(error))
        }
        /*
        axios
            .get('https://api.deezer.com/playlist/3155776842')
            .then(response => {
                for (var i = 0; i < 40; i++) {
                    var album = {
                        id: i,
                        title: response.data.tracks.data[i].album['title'],
                        cover:
                            response.data.tracks.data[i].album['cover_medium'],
                        artist: response.data.tracks.data[i].artist['name'],
                        albumId: response.data.tracks.data[i].album['id'],
                        albumLink:
                            'https://deezer.com/album/' +
                            response.data.tracks.data[i].album['id'], //questo non servirà poi, è solo per testare ora
                    }
                    this.albumArray.push(album)
                }
                this.$store.commit('toggleLoading')
                if (this.loading == true) {
                    this.$store.commit('toggleLoading')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            */
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
    methods: {
        prop(arr) {
            this.$emit('updateLista2', arr)
        },
        checkDuplicati(type, i, albumId) {
            var trovato = false
            var arr = Array
            if (type == 'world') {
                arr = this.worldAlbumArray
            } else {
                arr = this.italyAlbumArray
            }
            for (var j = 0; j < i; j++) {
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
    },
    inject: ['theme'],
}
</script>
